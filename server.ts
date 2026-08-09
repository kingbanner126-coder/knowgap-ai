import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.length > 5),
    });
  });

  // AI Gap Analysis endpoint
  app.post("/api/analyze", async (req, res) => {
    const { score, totalQuestions, correctCount, topicResults, wrongQuestionsSummary } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
      return res.json({
        success: false,
        message: "Chưa cấu hình GEMINI_API_KEY. Đang dùng hệ thống phân tích dự phòng.",
        isFallback: true
      });
    }

    try {
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const prompt = `Bạn là Chuyên gia Giáo dục & AI của ứng dụng "KnowGap AI – Phát hiện lỗ hổng kiến thức".
Hãy phân tích kết quả bài kiểm tra môn Toán THPT của học sinh dựa trên dữ liệu thực tế sau:
- Điểm tổng: ${score}/10 (${correctCount}/${totalQuestions} câu đúng)
- Kết quả theo chủ đề:
${JSON.stringify(topicResults, null, 2)}
- Danh sách câu hỏi làm sai & chủ đề tương ứng:
${JSON.stringify(wrongQuestionsSummary, null, 2)}

NHIỆM VỤ CỦA BẠN:
1. Xác định 1-3 chủ đề yếu nhất (có tỷ lệ đúng dưới 60% hoặc có lỗ hổng lớn).
2. Đánh giá mức độ nghiêm trọng (Rất cao / Trung bình / Cần lưu ý).
3. Giải thích nguyên nhân cốt lõi tại sao học sinh bị hổng kiến thức ở chủ đề đó.
4. Nêu rõ các khái niệm nền tảng bị thiếu (foundationalGaps).
5. Đề xuất nội dung cụ thể cần ôn tập (reviewRecommendations).
6. Lập Lộ trình học 5 ngày cá nhân hóa (roadmap) để học sinh ôn tập dần từng ngày.

YÊU CẦU QUAN TRỌNG:
- Trả về hoàn toàn bằng tiếng Việt chuẩn mực, khích lệ và sư phạm.
- Không đưa ra kết luận quá chắc chắn nếu dữ liệu không đủ.
- Tạo lộ trình 5 ngày thực tế với thời lượng 30-45 phút mỗi ngày.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              overallAssessment: {
                type: Type.STRING,
                description: "Nhận xét tổng quan về năng lực và điểm cần lưu ý của học sinh.",
              },
              weakestTopics: {
                type: Type.ARRAY,
                description: "Danh sách 1-3 chủ đề bị hổng kiến thức nghiêm trọng nhất.",
                items: {
                  type: Type.OBJECT,
                  properties: {
                    topic: { type: Type.STRING },
                    percentage: { type: Type.NUMBER },
                    status: { type: Type.STRING },
                    severity: { type: Type.STRING, description: "Rất cao, Trung bình, hoặc Cần lưu ý" },
                    reasoning: { type: Type.STRING, description: "Lý do AI xác định đây là lỗ hổng kiến thức." },
                    foundationalGaps: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      description: "Các kiến thức nền tảng bị thiếu.",
                    },
                    reviewRecommendations: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      description: "Nội dung cần ôn tập trước.",
                    },
                  },
                  required: ["topic", "percentage", "severity", "reasoning", "foundationalGaps", "reviewRecommendations"],
                },
              },
              keyRecommendations: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Các Lời khuyên hàng đầu của AI.",
              },
              roadmap: {
                type: Type.ARRAY,
                description: "Lộ trình học cá nhân hóa 5 ngày.",
                items: {
                  type: Type.OBJECT,
                  properties: {
                    day: { type: Type.NUMBER },
                    title: { type: Type.STRING },
                    durationMinutes: { type: Type.NUMBER },
                    description: { type: Type.STRING },
                    topic: { type: Type.STRING },
                    completed: { type: Type.BOOLEAN },
                  },
                  required: ["day", "title", "durationMinutes", "description", "topic"],
                },
              },
            },
            required: ["overallAssessment", "weakestTopics", "keyRecommendations", "roadmap"],
          },
        },
      });

      const text = response.text || "";
      const gapData = JSON.parse(text);

      return res.json({
        success: true,
        data: {
          ...gapData,
          isAiGenerated: true,
        },
      });
    } catch (error: any) {
      console.error("Gemini API Error:", error?.message || error);
      return res.json({
        success: false,
        error: error?.message || "Lỗi khi gọi Gemini API",
        isFallback: true,
      });
    }
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server KnowGap AI running at http://localhost:${PORT}`);
  });
}

startServer();

import { GapAnalysis, Question, TopicResult, WeakTopicGap } from '../types';

export async function analyzeTestResultsWithAI(
  score: number,
  totalQuestions: number,
  correctCount: number,
  topicResults: TopicResult[],
  wrongQuestions: Question[]
): Promise<GapAnalysis> {
  const wrongQuestionsSummary = wrongQuestions.map(q => ({
    topic: q.topic,
    question: q.question,
    difficulty: q.difficulty
  }));

  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        score,
        totalQuestions,
        correctCount,
        topicResults,
        wrongQuestionsSummary
      })
    });

    const result = await response.json();

    if (result.success && result.data) {
      return result.data;
    }
  } catch (err) {
    console.warn('Backend API request failed or offline, generating local rule-based analysis:', err);
  }

  // Fallback Rule-Based Analysis Generator
  return generateRuleBasedGapAnalysis(score, totalQuestions, correctCount, topicResults, wrongQuestions);
}

export function generateRuleBasedGapAnalysis(
  score: number,
  totalQuestions: number,
  correctCount: number,
  topicResults: TopicResult[],
  wrongQuestions: Question[]
): GapAnalysis {
  // Sort topics by lowest percentage
  const sortedTopics = [...topicResults].sort((a, b) => a.percentage - b.percentage);
  const weakestList = sortedTopics.filter(t => t.percentage < 70);

  const weakTopicGaps: WeakTopicGap[] = weakestList.slice(0, 2).map((t) => {
    let severity: 'Rất cao' | 'Trung bình' | 'Cần lưu ý' = 'Trung bình';
    if (t.percentage < 40) severity = 'Rất cao';
    else if (t.percentage >= 60) severity = 'Cần lưu ý';

    let reasoning = `Bạn làm đúng ${t.correct}/${t.total} câu (${t.percentage}%) ở chủ đề ${t.topic}. `;
    let foundationalGaps: string[] = [];
    let reviewRecommendations: string[] = [];

    switch (t.topic) {
      case 'Xác suất':
        reasoning += 'Trắc nghiệm phản ánh sự chưa vững vàng giữa Quy tắc cộng và Quy tắc nhân trong các bài toán biến cố hợp/giao.';
        foundationalGaps = [
          'Sự khác biệt giữa Tổ hợp C(n,k) và Chỉnh hợp A(n,k)',
          'Khái niệm biến cố xung khắc vs biến cố độc lập',
          'Sử dụng biến cố đối P(A) = 1 - P(A\')'
        ];
        reviewRecommendations = [
          'Xem lại định nghĩa công thức đếm căn bản',
          'Giải 10 bài tập phân loại Quy tắc cộng & nhân',
          'Luyện kỹ dạng bài toán lấy bi/chọn ngẫu nhiên'
        ];
        break;

      case 'Đạo hàm':
        reasoning += 'Mất điểm tập trung ở ứng dụng đạo hàm tìm tiếp tuyến đồ thị và bài toán chuyển động vận tốc/gia tốc.';
        foundationalGaps = [
          'Đạo hàm hàm số hợp u\' * f\'(u)',
          'Ý nghĩa cơ học của đạo hàm: v(t) = s\'(t) và a(t) = v\'(t)',
          'Viết phương trình tiếp tuyến y - y0 = f\'(x0)(x - x0)'
        ];
        reviewRecommendations = [
          'Ôn lại bảng đạo hàm các hàm sơ cấp và hàm hợp',
          'Thực hành 8 dạng bài tiếp tuyến đồ thị hàm số',
          'Làm lại các bài toán ứng dụng đạo hàm vật lý'
        ];
        break;

      case 'Hàm số':
        reasoning += 'Lỗ hổng nằm ở việc xác định điểm cực trị và đường tiệm cận đứng/ngang của hàm phân thức.';
        foundationalGaps = [
          'Quy tắc xét dấu y\' để tìm cực đại, cực tiểu',
          'Điều kiện tồn tại tiệm cận đứng x = x0 và tiệm cận ngang y = y0',
          'Tìm giá trị lớn nhất, nhỏ nhất trên đoạn [a; b]'
        ];
        reviewRecommendations = [
          'Ôn lại quy trình lập bảng biến thiên hàm số',
          'Thực hành đọc đồ thị và bảng biến thiên',
          'Luyện tập 10 bài toán tiệm cận đồ thị hàm số'
        ];
        break;

      case 'Nguyên hàm':
        reasoning += 'Chưa thành thạo phương pháp đổi biến số và tính diện tích hình phẳng bằng tích phân.';
        foundationalGaps = [
          'Công thức nguyên hàm cơ bản và tính chất tuyến tính',
          'Phương pháp đổi biến số t = u(x) => dt = u\'(x)dx',
          'Công thức diện tích S = ∫|f(x)|dx'
        ];
        reviewRecommendations = [
          'Thuộc lòng bảng nguyên hàm các hàm số thường gặp',
          'Giải 10 bài tập tích phân đổi biến số',
          'Luyện bài tập ứng dụng tích phân tính diện tích'
        ];
        break;

      default:
        reasoning += 'Cần củng cố lý thuyết trọng tâm và phương pháp giải nhanh.';
        foundationalGaps = [
          'Công thức biến đổi và tính chất nền tảng',
          'Kỹ năng lập luận trắc nghiệm loại trừ đáp án sai'
        ];
        reviewRecommendations = [
          'Đọc lại lý thuyết trong sách giáo khoa',
          'Giải lại các câu đã làm sai trong đề kiểm tra'
        ];
        break;
    }

    return {
      topic: t.topic,
      percentage: t.percentage,
      status: t.status,
      severity,
      reasoning,
      foundationalGaps,
      reviewRecommendations
    };
  });

  const mainWeakTopic = weakTopicGaps.length > 0 ? weakTopicGaps[0].topic : 'Đại số';

  return {
    overallAssessment: `Bạn đạt ${score}/10 điểm với ${correctCount}/${totalQuestions} câu đúng. Kết quả cho thấy bạn có phong độ khá ổn ở các câu hỏi lý thuyết căn bản. Tuy nhiên, để bứt phá điểm số, bạn cần tập trung lấp ngay lỗ hổng tại mảng ${mainWeakTopic}.`,
    isAiGenerated: false,
    weakestTopics: weakTopicGaps,
    keyRecommendations: [
      `Ưu tiên học lại mảng ${mainWeakTopic} trong 2-3 ngày tới.`,
      'Không làm quá nhiều đề mới khi chưa nắm chắc lý thuyết nền tảng.',
      'Dành 30 phút mỗi ngày giải lại các dạng bài bị làm sai.'
    ],
    roadmap: [
      {
        day: 1,
        title: `Ôn tập lý thuyết trọng tâm: ${mainWeakTopic}`,
        durationMinutes: 30,
        description: `Xem lại các công thức và khái niệm căn bản của ${mainWeakTopic}. Đọc lại lời giải chi tiết của các câu đã sai.`,
        topic: mainWeakTopic,
        completed: false
      },
      {
        day: 2,
        title: `Thực hành dạng bài cơ bản: ${mainWeakTopic}`,
        durationMinutes: 35,
        description: 'Giải 10-15 câu hỏi trắc nghiệm mức độ Nhận biết - Thông hiểu để củng cố phản xạ.',
        topic: mainWeakTopic,
        completed: false
      },
      {
        day: 3,
        title: `Củng cố chủ đề thứ hai: ${weakTopicGaps[1]?.topic || 'Hàm số'}`,
        durationMinutes: 40,
        description: `Ôn lại kiến thức và công thức chính của ${weakTopicGaps[1]?.topic || 'Hàm số'}. Luyện kỹ các dạng toán hay gài bẫy.`,
        topic: weakTopicGaps[1]?.topic || 'Hàm số',
        completed: false
      },
      {
        day: 4,
        title: 'Luyện tập tổng hợp 20 câu trắc nghiệm',
        durationMinutes: 45,
        description: 'Làm đề luyện tập tổng hợp bao gồm cả 5 chủ đề với bấm giờ như thi thật.',
        topic: 'Luyện tập chung',
        completed: false
      },
      {
        day: 5,
        title: 'Thực hiện Bài kiểm tra lại trên KnowGap AI',
        durationMinutes: 30,
        description: 'Làm lại bài kiểm tra để đánh giá sự cải thiện điểm số và mức độ lấp lỗ hổng kiến thức.',
        topic: 'Kiểm tra đánh giá',
        completed: false
      }
    ]
  };
}

import React from 'react';
import { 
  BrainCircuit, 
  Target, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  PlayCircle, 
  FileCheck, 
  BarChart, 
  Map, 
  HelpCircle,
  Lightbulb,
  ShieldCheck
} from 'lucide-react';

interface HeroSectionProps {
  onStartQuiz: () => void;
  onLoadDemo: () => void;
  onSelectSubject: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartQuiz,
  onLoadDemo,
  onSelectSubject
}) => {
  return (
    <div className="space-y-12 pb-12">
      
      {/* Main Hero Container */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white p-8 sm:p-12 lg:p-14 shadow-lg border border-indigo-800/60">
        
        {/* Glow decoration */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-indigo-200 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Chẩn đoán Lỗ hổng Kiến thức • AI Powered</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            KnowGap AI <br />
            <span className="text-indigo-300 font-bold italic">
              “Biết mình yếu ở đâu – Học đúng nơi đó”
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Sử dụng trí tuệ nhân tạo để phân tích bài kiểm tra, phát hiện lỗ hổng kiến thức cốt lõi và xây dựng lộ trình học tập 5 ngày cá nhân hóa dành riêng cho sinh viên.
          </p>

          {/* Action buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              id="hero-start-quiz-btn"
              onClick={onStartQuiz}
              className="px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-indigo-600 hover:bg-indigo-500 text-white shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Bắt đầu kiểm tra ngay</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-demo-btn"
              onClick={onLoadDemo}
              className="px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center justify-center gap-2 transition-all cursor-pointer backdrop-blur-md"
            >
              <PlayCircle className="w-4 h-4 text-amber-300" />
              <span>Xem bản demo báo cáo</span>
            </button>
          </div>

          {/* Key metrics / guarantee */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-white/10 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>20 câu trắc nghiệm Toán THPT</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>AI phân tích 5 chuyên đề</span>
            </div>
            <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Lộ trình cá nhân hóa 5 ngày</span>
            </div>
          </div>

        </div>
      </section>

      {/* 3-Step Process Section */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Quy trình Chẩn đoán & Lấp lỗ hổng
          </h2>
          <p className="text-xl font-black text-slate-800 tracking-tight">
            3 bước tiến tới nắm vững kiến thức
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Step 1 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-indigo-200 transition-all group">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 font-black text-sm flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              01
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-2 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-indigo-600" />
              1. Kiểm tra kiến thức
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Thực hiện bài kiểm tra trắc nghiệm 20 câu chuẩn phân bổ đều qua 5 chuyên đề kiến thức (Đại số, Hàm số, Đạo hàm, Nguyên hàm, Xác suất).
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-indigo-200 transition-all group">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 font-black text-sm flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              02
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-2 flex items-center gap-2">
              <BarChart className="w-5 h-5 text-indigo-600" />
              2. AI Chẩn đoán Lỗ hổng
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Mô hình AI tự động tổng hợp kết quả, đánh giá chính xác từng chủ đề và tìm ra khái niệm bị hổng kèm lý do mất điểm.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-indigo-200 transition-all group">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 font-black text-sm flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              03
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-2 flex items-center gap-2">
              <Map className="w-5 h-5 text-indigo-600" />
              3. Lộ trình Ôn tập 5 Ngày
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Nhận lộ trình ôn tập cá nhân hóa 5 ngày chi tiết tới từng thời lượng (30 - 45 phút/ngày) để tập trung cải thiện đúng điểm yếu.
            </p>
          </div>

        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 font-bold">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-900">
              Vấn đề cốt lõi sinh viên thường gặp khi làm bài kiểm tra
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Khi làm bài kiểm tra truyền thống, bạn chỉ nhận được một con số tổng kết (ví dụ: <strong className="text-slate-900 font-bold">6.5/10</strong>). Kết quả này cho biết bạn đạt hay không đạt, nhưng <strong className="text-slate-900 font-bold">KHÔNG</strong> trả lời được:
            </p>
            <ul className="text-xs sm:text-sm text-slate-700 space-y-1.5 list-disc pl-5">
              <li>Bạn mất điểm do thiếu công thức hay do hiểu sai bản chất khái niệm?</li>
              <li>Chủ đề nào bạn đã vững (chỉ cần duy trì) và chủ đề nào là "lỗ hổng tử huyệt"?</li>
              <li>Thứ tự ưu tiên ôn tập ra sao để tiết kiệm thời gian nhất?</li>
            </ul>
            <p className="text-xs sm:text-sm text-blue-700 font-semibold pt-1">
              👉 KnowGap AI được xây dựng để trả lời chính xác tất cả các câu hỏi trên bằng dữ liệu và trí tuệ nhân tạo!
            </p>
          </div>
        </div>
      </section>

      {/* Requirement Item #20: KnowGap AI vs ChatGPT comparison */}
      <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200/80 space-y-4 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-600 text-white">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-blue-950">
              KnowGap AI khác gì so với việc hỏi ChatGPT?
            </h3>
            <p className="text-xs text-blue-800">
              Sự khác biệt giữa Chatbot tổng quát và Hệ thống AI Chẩn đoán Học tập
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs">
          
          {/* Standard ChatGPT */}
          <div className="p-4 rounded-xl bg-white/80 border border-slate-200 space-y-2">
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-slate-400" />
              Chatbot AI thông thường (ChatGPT)
            </div>
            <p className="text-slate-600 leading-relaxed">
              Chủ yếu trả lời câu hỏi do người dùng chủ động đặt ra. Nếu sinh viên không biết mình yếu ở đâu thì sẽ không thể đặt câu hỏi đúng trọng tâm.
            </p>
          </div>

          {/* KnowGap AI */}
          <div className="p-4 rounded-xl bg-white border border-blue-300 shadow-xs space-y-2">
            <div className="font-bold text-blue-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              Hệ thống KnowGap AI
            </div>
            <p className="text-slate-700 leading-relaxed font-medium">
              Chủ động phân tích dữ liệu làm bài kiểm tra thực tế, tự động đo lường tỷ lệ chính xác từng chủ đề, khoanh vùng lỗ hổng kiến thức, lập lộ trình 5 ngày và theo dõi tiến bộ qua từng lần thi lại.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};

import React, { useState } from 'react';
import { Question } from '../types';
import { 
  ChevronLeft, 
  ChevronRight, 
  Send, 
  BrainCircuit, 
  Sparkles, 
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  ListFilter
} from 'lucide-react';

interface QuizRunnerProps {
  questions: Question[];
  onSubmitQuiz: (answers: Record<number, number>) => void;
  onCancel: () => void;
}

export const QuizRunner: React.FC<QuizRunnerProps> = ({
  questions,
  onSubmitQuiz,
  onCancel
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(1);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(userAnswers).length;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  const handleSelectOption = (optionIndex: number) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionIndex
    }));
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) setCurrentIndex(prev => prev + 1);
  };

  const handleConfirmSubmit = () => {
    setShowSubmitModal(false);
    setIsAnalyzing(true);

    // AI Analysis simulation steps sequence
    const interval = setInterval(() => {
      setAnalysisStep(prev => {
        if (prev >= 4) {
          clearInterval(interval);
          setTimeout(() => {
            onSubmitQuiz(userAnswers);
          }, 600);
          return 4;
        }
        return prev + 1;
      });
    }, 600);
  };

  if (isAnalyzing) {
    return (
      <div className="min-h-[450px] flex flex-col items-center justify-center p-8 text-center space-y-6 bg-white rounded-3xl border border-blue-100 shadow-lg">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-xl animate-pulse">
            <BrainCircuit className="w-10 h-10 animate-bounce" />
          </div>
          <Sparkles className="w-6 h-6 text-amber-400 absolute -top-1 -right-1 animate-spin" />
        </div>

        <div className="space-y-2 max-w-md">
          <h3 className="text-xl font-black text-slate-900">
            Đang phân tích kết quả bằng AI...
          </h3>
          <p className="text-xs text-slate-600">
            Thuật toán KnowGap AI đang đánh giá năng lực từng chủ đề và khoanh vùng lỗ hổng kiến thức của bạn.
          </p>
        </div>

        {/* Step checklist */}
        <div className="w-full max-w-md bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left space-y-2.5 text-xs">
          <div className={`flex items-center gap-2.5 ${analysisStep >= 1 ? 'text-blue-700 font-bold' : 'text-slate-400'}`}>
            <CheckCircle2 className={`w-4 h-4 ${analysisStep >= 1 ? 'text-blue-600' : 'text-slate-300'}`} />
            <span>Chấm điểm 20 câu trắc nghiệm...</span>
          </div>

          <div className={`flex items-center gap-2.5 ${analysisStep >= 2 ? 'text-blue-700 font-bold' : 'text-slate-400'}`}>
            <CheckCircle2 className={`w-4 h-4 ${analysisStep >= 2 ? 'text-blue-600' : 'text-slate-300'}`} />
            <span>Đo lường tỷ lệ chính xác 5 chủ đề môn Toán...</span>
          </div>

          <div className={`flex items-center gap-2.5 ${analysisStep >= 3 ? 'text-blue-700 font-bold' : 'text-slate-400'}`}>
            <CheckCircle2 className={`w-4 h-4 ${analysisStep >= 3 ? 'text-blue-600' : 'text-slate-300'}`} />
            <span>Truy xuất Gemini AI phát hiện lỗ hổng kiến thức...</span>
          </div>

          <div className={`flex items-center gap-2.5 ${analysisStep >= 4 ? 'text-blue-700 font-bold' : 'text-slate-400'}`}>
            <CheckCircle2 className={`w-4 h-4 ${analysisStep >= 4 ? 'text-blue-600' : 'text-slate-300'}`} />
            <span>Khởi tạo lộ trình học cá nhân hóa 5 ngày...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Quiz Top Bar */}
      <div className="p-4 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
              Kiểm tra Môn Toán THPT
            </span>
            <span className="text-xs text-slate-500 hidden sm:inline">
              Đã làm: <strong className="text-slate-900 font-bold">{answeredCount}/{totalQuestions}</strong> câu
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onCancel}
              className="text-xs text-slate-500 hover:text-slate-800 font-medium cursor-pointer"
            >
              Hủy bài làm
            </button>
            <button
              id="btn-submit-quiz-top"
              onClick={() => setShowSubmitModal(true)}
              className="px-4 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Nộp bài ngay</span>
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-slate-600 font-medium">
            <span>Câu {currentIndex + 1} trên {totalQuestions}</span>
            <span>Tiến độ: {progressPercent}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-md space-y-6">
        
        {/* Question Header Tags */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-xs border border-indigo-100">
              📌 Chủ đề: {currentQuestion.topic}
            </span>
            <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold ${
              currentQuestion.difficulty === 'easy'
                ? 'bg-emerald-50 text-emerald-700'
                : currentQuestion.difficulty === 'medium'
                ? 'bg-amber-50 text-amber-700'
                : 'bg-rose-50 text-rose-700'
            }`}>
              Mức độ: {
                currentQuestion.difficulty === 'easy' ? 'Dễ' :
                currentQuestion.difficulty === 'medium' ? 'Trung bình' : 'Khó'
              }
            </span>
          </div>

          <span className="text-xs font-bold text-slate-400">
            Câu hỏi #{currentIndex + 1}
          </span>
        </div>

        {/* Question Text */}
        <div className="space-y-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
            {currentQuestion.question}
          </h3>
        </div>

        {/* Options List */}
        <div className="grid grid-cols-1 gap-3 pt-2">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = userAnswers[currentQuestion.id] === idx;

            return (
              <button
                key={idx}
                id={`option-${currentQuestion.id}-${idx}`}
                onClick={() => handleSelectOption(idx)}
                className={`p-4 rounded-xl border-2 text-left font-medium text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-50/90 border-blue-600 text-blue-950 font-bold shadow-xs'
                    : 'bg-slate-50/60 border-slate-200/90 text-slate-800 hover:bg-slate-100/80 hover:border-slate-300'
                }`}
              >
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs ${
                  isSelected
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200 text-slate-600'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </div>
                <span className="pt-0.5 leading-relaxed">{option}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <button
          id="btn-quiz-prev"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
            currentIndex === 0
              ? 'text-slate-300 cursor-not-allowed'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Câu trước</span>
        </button>

        {/* Quick jump question numbers */}
        <div className="hidden md:flex items-center gap-1 overflow-x-auto max-w-md px-2">
          {questions.map((q, idx) => {
            const isAnswered = userAnswers[q.id] !== undefined;
            const isCurrent = idx === currentIndex;

            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`w-7 h-7 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-blue-600 text-white shadow-xs'
                    : isAnswered
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        {currentIndex < totalQuestions - 1 ? (
          <button
            id="btn-quiz-next"
            onClick={handleNext}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <span>Câu tiếp theo</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            id="btn-quiz-submit-bottom"
            onClick={() => setShowSubmitModal(true)}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Nộp bài & Phân tích</span>
          </button>
        )}
      </div>

      {/* Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-amber-100 text-amber-700">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Xác nhận nộp bài kiểm tra
                </h3>
                <p className="text-xs text-slate-500">
                  Bạn đã trả lời <strong className="text-slate-900">{answeredCount}/{totalQuestions}</strong> câu hỏi.
                </p>
              </div>
            </div>

            {answeredCount < totalQuestions && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800">
                ⚠️ Còn {totalQuestions - answeredCount} câu chưa trả lời. Các câu bỏ trống sẽ được tính là trả lời sai trong phần phân tích AI.
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Tiếp tục làm bài
              </button>
              <button
                id="btn-confirm-submit"
                onClick={handleConfirmSubmit}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Nộp bài & AI Phân tích</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

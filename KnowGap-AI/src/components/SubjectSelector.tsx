import React from 'react';
import { AVAILABLE_SUBJECTS } from '../data/questionsData';
import { 
  Calculator, 
  Zap, 
  FlaskConical, 
  Code2, 
  BookOpen, 
  Languages, 
  ArrowRight, 
  CheckCircle, 
  Sparkles,
  Lock
} from 'lucide-react';

interface SubjectSelectorProps {
  onSelectMath: () => void;
  onLoadDemo: () => void;
}

export const SubjectSelector: React.FC<SubjectSelectorProps> = ({
  onSelectMath,
  onLoadDemo
}) => {

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Calculator': return <Calculator className="w-6 h-6 text-white" />;
      case 'Zap': return <Zap className="w-6 h-6 text-white" />;
      case 'FlaskConical': return <FlaskConical className="w-6 h-6 text-white" />;
      case 'Code2': return <Code2 className="w-6 h-6 text-white" />;
      case 'BookOpen': return <BookOpen className="w-6 h-6 text-white" />;
      case 'Languages': return <Languages className="w-6 h-6 text-white" />;
      default: return <BookOpen className="w-6 h-6 text-white" />;
    }
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Section Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Danh mục môn học
        </h2>
        <p className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
          Chọn môn học để chẩn đoán lỗ hổng kiến thức
        </p>
        <p className="text-xs sm:text-sm text-slate-500">
          Hệ thống ưu tiên bộ đề kiểm tra chuẩn <strong className="text-indigo-600 font-bold">Môn Toán (20 câu THPT)</strong> với đầy đủ 5 chuyên đề kiến thức.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {AVAILABLE_SUBJECTS.map((subject) => {
          const isAvailable = subject.available;

          return (
            <div
              key={subject.id}
              className={`rounded-2xl border transition-all duration-200 flex flex-col justify-between p-6 relative overflow-hidden ${
                isAvailable
                  ? 'bg-white border-blue-300 shadow-md hover:shadow-xl hover:-translate-y-1 ring-2 ring-blue-500/10'
                  : 'bg-slate-50/80 border-slate-200 opacity-80'
              }`}
            >
              {/* Badge for status */}
              {isAvailable ? (
                <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Sẵn sàng (20 câu)</span>
                </div>
              ) : (
                <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-slate-200 text-slate-600 text-[11px] font-semibold flex items-center gap-1">
                  <Lock className="w-3 h-3 text-slate-500" />
                  <span>Mô hình Demo</span>
                </div>
              )}

              {/* Card Header & Icon */}
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${subject.color} flex items-center justify-center shadow-md`}>
                  {getIcon(subject.icon)}
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    {subject.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed min-h-[36px]">
                    {subject.description}
                  </p>
                </div>
              </div>

              {/* Topics breakdown info inside card */}
              {isAvailable && (
                <div className="my-4 p-3 rounded-xl bg-blue-50/80 border border-blue-100 space-y-1 text-xs text-blue-900">
                  <div className="font-semibold flex items-center gap-1 text-blue-800">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>5 Chủ đề kiểm tra:</span>
                  </div>
                  <div className="text-[11px] text-blue-700 font-medium">
                    Đại số • Hàm số • Đạo hàm • Nguyên hàm • Xác suất (4 câu/chủ đề)
                  </div>
                </div>
              )}

              {/* Card Footer Button */}
              <div className="pt-4 mt-auto">
                {isAvailable ? (
                  <button
                    id={`btn-subject-${subject.id}`}
                    onClick={onSelectMath}
                    className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Làm bài kiểm tra ngay</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full py-2.5 px-4 rounded-xl font-medium text-xs bg-slate-200 text-slate-500 cursor-not-allowed flex items-center justify-center gap-1.5"
                  >
                    <span>Sắp hỗ trợ ở bản chính thức</span>
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Quick Demo CTA Box */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-900 to-blue-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-bold text-base flex items-center justify-center sm:justify-start gap-2">
            <Sparkles className="w-4 h-4 text-amber-300" />
            Cần trình diễn nhanh kết quả phân tích AI?
          </h4>
          <p className="text-xs text-indigo-200">
            Xem ngay bản báo cáo phân tích AI mẫu với đầy đủ điểm số, biểu đồ và lộ trình học cá nhân hóa.
          </p>
        </div>
        <button
          onClick={onLoadDemo}
          className="px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-900 shrink-0 transition-all shadow cursor-pointer"
        >
          Xem bản demo kết quả ngay
        </button>
      </div>

    </div>
  );
};

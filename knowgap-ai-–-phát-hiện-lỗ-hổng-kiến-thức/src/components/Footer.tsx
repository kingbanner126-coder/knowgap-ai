import React from 'react';
import { BrainCircuit, Heart, Sparkles, BookOpen, GraduationCap } from 'lucide-react';

interface FooterProps {
  onOpenGuide: () => void;
  onLoadDemo: () => void;
  setActiveTab: (tab: 'home' | 'subjects' | 'quiz' | 'result' | 'history') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenGuide,
  onLoadDemo,
  setActiveTab
}) => {
  return (
    <footer className="bg-slate-900 text-slate-300 text-xs border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                KnowGap AI
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-md">
              Hệ thống trí tuệ nhân tạo chẩn đoán lỗ hổng kiến thức học tập cho sinh viên. Đưa ra lộ trình ôn tập cá nhân hóa dựa trên dữ liệu làm bài kiểm tra thực tế.
            </p>
            <div className="text-[11px] text-slate-500 italic">
              Đề tài sinh viên: “Ứng dụng AI trong học tập”
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-2">
            <h4 className="font-bold text-white text-sm">Điều hướng</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-blue-400 cursor-pointer">
                  Trang chủ
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('subjects')} className="hover:text-blue-400 cursor-pointer">
                  Chọn môn học
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('history')} className="hover:text-blue-400 cursor-pointer">
                  Lịch sử & Tiến bộ
                </button>
              </li>
              <li>
                <button onClick={onLoadDemo} className="hover:text-amber-400 cursor-pointer font-bold text-amber-300">
                  Xem bản demo nhanh
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Presentation Tools */}
          <div className="space-y-2">
            <h4 className="font-bold text-white text-sm">Trình diễn đồ án</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <button onClick={onOpenGuide} className="hover:text-blue-400 cursor-pointer text-blue-300 font-semibold">
                  Hướng dẫn cấu hình & Deploy
                </button>
              </li>
              <li>
                <span>Môn mẫu: Toán THPT (20 câu)</span>
              </li>
              <li>
                <span>Tích hợp Gemini API</span>
              </li>
              <li>
                <span>Lưu trữ LocalStorage</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2026 KnowGap AI – Phát hiện lỗ hổng kiến thức. Tất cả quyền được bảo lưu.
          </div>
          <div className="flex items-center gap-1">
            <span>Xây dựng phục vụ đồ án học tập sinh viên</span>
            <GraduationCap className="w-4 h-4 text-blue-400" />
          </div>
        </div>

      </div>
    </footer>
  );
};

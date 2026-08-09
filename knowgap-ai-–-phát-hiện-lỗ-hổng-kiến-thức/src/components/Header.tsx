import React, { useEffect, useState } from 'react';
import { BrainCircuit, Sparkles, BookOpen, BarChart3, History, PlayCircle, HelpCircle } from 'lucide-react';

interface HeaderProps {
  activeTab: 'home' | 'subjects' | 'quiz' | 'result' | 'history';
  setActiveTab: (tab: 'home' | 'subjects' | 'quiz' | 'result' | 'history') => void;
  onLoadDemo: () => void;
  onOpenGuide: () => void;
  hasResult: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onLoadDemo,
  onOpenGuide,
  hasResult
}) => {
  const [hasApiKey, setHasApiKey] = useState<boolean | null>(null);

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => setHasApiKey(data.hasGeminiKey))
      .catch(() => setHasApiKey(false));
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Branding */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center space-x-3 cursor-pointer group"
            id="brand-logo"
          >
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-sm group-hover:bg-indigo-700 transition-colors">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-slate-800 tracking-tight">
                  KnowGap AI
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 rounded-md border border-indigo-100">
                  Phân tích Lỗ hổng
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider hidden sm:block">
                Hệ thống AI Chẩn đoán Học tập
              </p>
            </div>
          </div>

          {/* Nav Tabs - Professional Polish Uppercase Tracking Style */}
          <nav className="hidden md:flex space-x-6 text-xs font-bold text-slate-500 uppercase tracking-widest">
            <button
              id="nav-tab-home"
              onClick={() => setActiveTab('home')}
              className={`pb-1 transition-colors cursor-pointer ${
                activeTab === 'home'
                  ? 'text-indigo-600 border-b-2 border-indigo-600 font-extrabold'
                  : 'hover:text-slate-800'
              }`}
            >
              Trang chủ
            </button>

            <button
              id="nav-tab-subjects"
              onClick={() => setActiveTab('subjects')}
              className={`pb-1 transition-colors cursor-pointer ${
                activeTab === 'subjects' || activeTab === 'quiz'
                  ? 'text-indigo-600 border-b-2 border-indigo-600 font-extrabold'
                  : 'hover:text-slate-800'
              }`}
            >
              Môn học
            </button>

            {hasResult && (
              <button
                id="nav-tab-result"
                onClick={() => setActiveTab('result')}
                className={`pb-1 transition-colors cursor-pointer ${
                  activeTab === 'result'
                    ? 'text-indigo-600 border-b-2 border-indigo-600 font-extrabold'
                    : 'hover:text-slate-800'
                }`}
              >
                Lộ trình & Báo cáo
              </button>
            )}

            <button
              id="nav-tab-history"
              onClick={() => setActiveTab('history')}
              className={`pb-1 transition-colors cursor-pointer ${
                activeTab === 'history'
                  ? 'text-indigo-600 border-b-2 border-indigo-600 font-extrabold'
                  : 'hover:text-slate-800'
              }`}
            >
              Lịch sử
            </button>
          </nav>

          {/* User Profile & Quick Actions */}
          <div className="flex items-center space-x-3">
            
            {/* Guide modal button */}
            <button
              id="btn-open-guide"
              onClick={onOpenGuide}
              className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold"
              title="Hướng dẫn cấu hình & báo cáo"
            >
              <HelpCircle className="w-4 h-4 text-indigo-600" />
              <span className="hidden sm:inline">Hướng dẫn</span>
            </button>

            {/* Quick Demo Button */}
            <button
              id="btn-quick-demo"
              onClick={onLoadDemo}
              className="px-3.5 py-2 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <PlayCircle className="w-4 h-4 text-amber-300" />
              <span>Xem Demo</span>
            </button>

            {/* Student Avatar / Profile Badge from design */}
            <div className="hidden lg:flex items-center space-x-3 pl-2 border-l border-slate-200">
              <div className="text-right">
                <p className="text-[10px] uppercase font-bold text-slate-400">Sinh viên</p>
                <p className="text-xs font-bold text-slate-800">Nguyễn Văn A</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 font-black text-xs flex items-center justify-center border border-indigo-200 shadow-xs">
                NV
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center justify-around bg-slate-50 border-t border-slate-200/80 px-2 py-1.5 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveTab('home')}
          className={`px-3 py-1 rounded-md font-medium whitespace-nowrap ${
            activeTab === 'home' ? 'bg-blue-600 text-white' : 'text-slate-600'
          }`}
        >
          Trang chủ
        </button>
        <button
          onClick={() => setActiveTab('subjects')}
          className={`px-3 py-1 rounded-md font-medium whitespace-nowrap ${
            activeTab === 'subjects' || activeTab === 'quiz' ? 'bg-blue-600 text-white' : 'text-slate-600'
          }`}
        >
          Chọn môn
        </button>
        {hasResult && (
          <button
            onClick={() => setActiveTab('result')}
            className={`px-3 py-1 rounded-md font-medium whitespace-nowrap ${
              activeTab === 'result' ? 'bg-blue-600 text-white' : 'text-slate-600'
            }`}
          >
            Phân tích AI
          </button>
        )}
        <button
          onClick={() => setActiveTab('history')}
          className={`px-3 py-1 rounded-md font-medium whitespace-nowrap ${
            activeTab === 'history' ? 'bg-blue-600 text-white' : 'text-slate-600'
          }`}
        >
          Lịch sử
        </button>
      </div>
    </header>
  );
};

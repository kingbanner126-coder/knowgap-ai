import React, { useState } from 'react';
import { TestResult, RoadmapDay } from '../types';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar 
} from 'recharts';
import { 
  Trophy, 
  CheckCircle2, 
  AlertTriangle, 
  BrainCircuit, 
  Sparkles, 
  Clock, 
  Calendar, 
  RotateCcw, 
  PlayCircle, 
  ArrowRight, 
  CheckSquare, 
  Square,
  HelpCircle,
  Lightbulb,
  Layers,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface ResultDashboardProps {
  result: TestResult;
  onRetakeTest: () => void;
}

export const ResultDashboard: React.FC<ResultDashboardProps> = ({
  result,
  onRetakeTest
}) => {
  const [roadmap, setRoadmap] = useState<RoadmapDay[]>(result.gaps.roadmap || []);
  const [chartType, setChartType] = useState<'bar' | 'radar'>('bar');
  const [showQuestionsBreakdown, setShowQuestionsBreakdown] = useState(false);

  const completedCount = roadmap.filter(r => r.completed).length;
  const roadmapProgressPercent = roadmap.length > 0 
    ? Math.round((completedCount / roadmap.length) * 100) 
    : 0;

  const toggleTaskCompletion = (dayIndex: number) => {
    setRoadmap(prev => prev.map((item, idx) => 
      idx === dayIndex ? { ...item, completed: !item.completed } : item
    ));
  };

  const handleResetRoadmap = () => {
    setRoadmap(prev => prev.map(item => ({ ...item, completed: false })));
  };

  // Recharts data format
  const chartData = result.topicResults.map(t => ({
    topic: t.topic,
    percentage: t.percentage,
    color: t.color
  }));

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      
      {/* 1. Header Banner & Key Metrics Card Grid */}
      <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Báo cáo Chẩn đoán AI • {result.subject}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
              KẾT QUẢ VÀ LỖ HỔNG KIẾN THỨC
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              Thực hiện ngày: <strong className="text-slate-700">{result.dateStr}</strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-retake-test-top"
              onClick={onRetakeTest}
              className="px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Kiểm tra lại</span>
            </button>
          </div>
        </div>

        {/* Top Score & Overall Status Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Circular Score Metric Gauge (From Professional Polish Theme) */}
          <div className="md:col-span-5 bg-slate-50/80 p-6 rounded-2xl border border-slate-200/80 flex items-center justify-between">
            <div className="relative w-28 h-28 shrink-0">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path className="text-slate-200" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path 
                  className={result.score >= 8 ? 'text-green-500' : result.score >= 6 ? 'text-indigo-600' : 'text-amber-500'} 
                  strokeDasharray={`${(result.score / 10) * 100}, 100`} 
                  strokeWidth="3.2" 
                  strokeLinecap="round" 
                  stroke="currentColor" 
                  fill="none" 
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-slate-800">{result.score}</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">/ 10 Điểm</span>
              </div>
            </div>

            <div className="flex-1 ml-6 space-y-3">
              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                <p className="text-[10px] uppercase font-bold text-emerald-600">Câu trả lời đúng</p>
                <p className="text-xl font-bold text-emerald-700">{result.correctCount}/{result.totalQuestions}</p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <p className="text-[10px] uppercase font-bold text-slate-400">Xếp loại chung</p>
                <p className="text-lg font-bold text-slate-800">
                  {result.score >= 8 ? 'Giỏi' : result.score >= 6.5 ? 'Khá' : result.score >= 5 ? 'Trung bình' : 'Cần cố gắng'}
                </p>
              </div>
            </div>
          </div>

          {/* AI Assessment Message */}
          <div className="md:col-span-7 bg-indigo-50/60 p-6 rounded-2xl border border-indigo-100 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
              <BrainCircuit className="w-4 h-4 text-indigo-600" />
              <span>Đánh giá tổng quan từ Gemini AI:</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {result.gaps.overallAssessment}
            </p>
            <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-500 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Mô hình phân tích: {result.gaps.isAiGenerated ? 'Gemini 3.6 Flash AI' : 'Rule-Engine Chẩn đoán'}</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Topic Performance Section (Năng lực theo chủ đề) */}
      <section className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Năng lực theo chủ đề
            </h2>
            <p className="text-lg font-bold text-slate-800">
              Đo lường tỷ lệ chính xác qua 5 chuyên đề
            </p>
          </div>

          {/* Toggle Chart View */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setChartType('bar')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                chartType === 'bar' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
              }`}
            >
              Biểu đồ cột
            </button>
            <button
              onClick={() => setChartType('radar')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                chartType === 'radar' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
              }`}
            >
              Biểu đồ Radar
            </button>
          </div>
        </div>

        {/* Visual Chart */}
        <div className="h-60 sm:h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'bar' ? (
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <XAxis dataKey="topic" tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#64748b' }} unit="%" />
                <Tooltip 
                  formatter={(value: any) => [`${value}%`, 'Tỷ lệ đúng']}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="percentage" radius={[8, 8, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            ) : (
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="topic" tick={{ fill: '#334155', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name="Tỷ lệ đúng (%)" dataKey="percentage" stroke="#4f46e5" fill="#6366f1" fillOpacity={0.5} />
                <Tooltip formatter={(val: any) => [`${val}%`, 'Tỷ lệ đúng']} />
              </RadarChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Topic Breakdown Progress Bars (Professional Polish Clean Progress Style) */}
        <div className="space-y-3 pt-2">
          {result.topicResults.map((t, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs sm:text-sm font-semibold">
                <span className="text-slate-800">{t.topic}</span>
                <span className={`font-bold ${
                  t.percentage >= 80 ? 'text-emerald-600' :
                  t.percentage >= 60 ? 'text-amber-600' :
                  t.percentage >= 40 ? 'text-orange-600' :
                  'text-rose-600'
                }`}>
                  {t.percentage}% ({t.correct}/{t.total} câu)
                </span>
              </div>
              <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${t.percentage}%`, backgroundColor: t.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Section: AI Phân tích Lỗ hổng (Theme's Signature Dark Banner) */}
      <section className="bg-gradient-to-br from-indigo-900 to-slate-900 p-6 sm:p-8 rounded-2xl shadow-lg text-white space-y-6">
        
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 bg-indigo-500 rounded-full flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-indigo-300 uppercase tracking-widest">
              Chẩn đoán chuyên sâu
            </h2>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              AI PHÂN TÍCH LỖ HỔNG KIẾN THỨC CỐT LÕI
            </h3>
          </div>
        </div>

        {/* Gap Cards Container */}
        <div className="space-y-4">
          {result.gaps.weakestTopics.map((gap, idx) => (
            <div 
              key={idx}
              className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/10 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400 animate-pulse" />
                  <h4 className="text-base font-bold text-white">
                    Chủ đề yếu: <span className="text-amber-300">{gap.topic}</span> ({gap.percentage}%)
                  </h4>
                </div>

                <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-rose-500/20 text-rose-200 border border-rose-400/30 w-fit">
                  Mức độ hổng: {gap.severity}
                </span>
              </div>

              {/* Reasoning */}
              <div className="space-y-1">
                <p className="text-xs text-slate-300 leading-relaxed">
                  {gap.reasoning}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                
                {/* Foundational Gaps */}
                <div className="bg-white/5 rounded-lg p-3.5 border border-white/5 space-y-1.5">
                  <p className="text-[10px] text-indigo-300 font-bold uppercase">
                    Lỗ hổng khái niệm nền tảng
                  </p>
                  <ul className="text-xs text-slate-200 space-y-1 list-disc pl-4 font-medium">
                    {gap.foundationalGaps.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Review Recommendations */}
                <div className="bg-white/5 rounded-lg p-3.5 border border-white/5 space-y-1.5">
                  <p className="text-[10px] text-emerald-300 font-bold uppercase">
                    Khuyến nghị nội dung ôn tập
                  </p>
                  <ul className="text-xs text-slate-200 space-y-1 list-disc pl-4 font-medium">
                    {gap.reviewRecommendations.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

              </div>

            </div>
          ))}
        </div>
      </section>

      {/* 4. Section: LỘ TRÌNH CÁ NHÂN HÓA (5 Days Grid) */}
      <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Lộ trình cá nhân hóa
            </h2>
            <h3 className="text-lg font-extrabold text-slate-800">
              Kế hoạch ôn tập 5 ngày lấp đầy lỗ hổng
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetRoadmap}
              className="text-xs text-indigo-600 font-bold hover:underline cursor-pointer flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset tiến độ</span>
            </button>
          </div>
        </div>

        {/* 5-Day Card Grid (Professional Polish Theme Style) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {roadmap.map((dayItem, idx) => {
            const isLastDay = idx === 4;

            return (
              <div
                key={idx}
                onClick={() => toggleTaskCompletion(idx)}
                className={`flex flex-col h-full rounded-xl p-4 border transition-all cursor-pointer ${
                  dayItem.completed
                    ? 'bg-emerald-50/80 border-emerald-300 shadow-xs'
                    : isLastDay
                    ? 'bg-indigo-50/90 border-2 border-indigo-200 shadow-sm'
                    : 'bg-slate-50 border-slate-200 hover:border-indigo-300'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isLastDay ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700'
                  }`}>
                    Ngày {dayItem.day}
                  </span>
                  <input 
                    type="checkbox" 
                    checked={dayItem.completed} 
                    onChange={() => {}}
                    className="rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  />
                </div>

                <p className={`text-xs font-bold leading-snug mb-2 ${
                  isLastDay ? 'text-indigo-900 italic' : 'text-slate-800'
                } ${dayItem.completed ? 'line-through text-slate-400' : ''}`}>
                  {dayItem.title}
                </p>

                <p className="text-[11px] text-slate-500 leading-relaxed mb-4">
                  {dayItem.description}
                </p>

                <div className="mt-auto pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-500 font-semibold">
                  <span className="flex items-center">
                    <Clock className="w-3 h-3 mr-1 text-slate-400" />
                    {dayItem.durationMinutes} phút
                  </span>
                  <span className="text-slate-700">{dayItem.topic}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Callout Button */}
        <div className="p-6 rounded-2xl bg-indigo-600 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-bold text-base">
              Đã hoàn thành ôn tập theo lộ trình?
            </h4>
            <p className="text-xs text-indigo-100">
              Làm lại bài kiểm tra để đo lường mức độ cải thiện điểm số và lỗ hổng kiến thức!
            </p>
          </div>

          <button
            id="btn-retake-after-learning"
            onClick={onRetakeTest}
            className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-amber-400 hover:bg-amber-300 text-slate-900 shrink-0 transition-colors shadow cursor-pointer flex items-center gap-1.5"
          >
            <PlayCircle className="w-4 h-4" />
            <span>Làm bài kiểm tra ngay</span>
          </button>
        </div>

      </section>

      {/* Detailed Solutions Section */}
      <section className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
        <button
          onClick={() => setShowQuestionsBreakdown(!showQuestionsBreakdown)}
          className="w-full flex items-center justify-between font-bold text-xs text-slate-700 hover:text-slate-900 cursor-pointer"
        >
          <span className="uppercase tracking-wider">Xem chi tiết đáp án & lời giải từng câu hỏi</span>
          {showQuestionsBreakdown ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showQuestionsBreakdown && (
          <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 text-xs">
            <p className="text-slate-500 italic">
              Lời giải chi tiết được gắn với từng khái niệm môn Toán giúp bạn tự ôn tập độc lập:
            </p>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700">
              📌 Lời giải chi tiết và công thức liên quan đã được tích hợp trực tiếp vào lộ trình 5 ngày ôn tập phía trên.
            </div>
          </div>
        )}
      </section>

    </div>
  );
};

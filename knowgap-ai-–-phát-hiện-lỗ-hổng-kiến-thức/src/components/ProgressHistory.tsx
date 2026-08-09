import React, { useState } from 'react';
import { TestResult } from '../types';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid 
} from 'recharts';
import { 
  TrendingUp, 
  History, 
  Award, 
  Sparkles, 
  Calendar, 
  ArrowUpRight, 
  CheckCircle2, 
  Eye, 
  RotateCcw,
  BookOpen
} from 'lucide-react';

interface ProgressHistoryProps {
  history: TestResult[];
  onSelectResult: (result: TestResult) => void;
  onRetakeTest: () => void;
}

export const ProgressHistory: React.FC<ProgressHistoryProps> = ({
  history,
  onSelectResult,
  onRetakeTest
}) => {
  const [selectedHistoryModal, setSelectedHistoryModal] = useState<TestResult | null>(null);

  if (!history || history.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
          <History className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">Chưa có dữ liệu lịch sử</h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Hãy hoàn thành bài kiểm tra đầu tiên để KnowGap AI bắt đầu theo dõi sự tiến bộ và lộ trình lấp lỗ hổng kiến thức của bạn.
        </p>
        <button
          onClick={onRetakeTest}
          className="px-5 py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
        >
          Làm bài kiểm tra ngay
        </button>
      </div>
    );
  }

  // Format chart data for line graph
  const lineChartData = history.map((item, index) => ({
    attempt: `Lần ${index + 1} (${item.dateStr})`,
    score: item.score,
    correctCount: item.correctCount
  }));

  // Compare first attempt vs latest attempt for progress highlights
  const firstAttempt = history[0];
  const latestAttempt = history[history.length - 1];
  const scoreDiff = (latestAttempt.score - firstAttempt.score).toFixed(1);

  // Compare specific weak topic improvement (e.g. Xác suất)
  const getTopicScore = (res: TestResult, topicName: string) => {
    const found = res.topicResults?.find(t => t.topic === topicName);
    return found ? found.percentage : 0;
  };

  const probFirst = getTopicScore(firstAttempt, 'Xác suất');
  const probLatest = getTopicScore(latestAttempt, 'Xác suất');
  const probDiff = probLatest - probFirst;

  const derivFirst = getTopicScore(firstAttempt, 'Đạo hàm');
  const derivLatest = getTopicScore(latestAttempt, 'Đạo hàm');
  const derivDiff = derivLatest - derivFirst;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Theo dõi sự tiến bộ
          </h2>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight pt-1">
            Lịch sử kiểm tra & Đánh giá cải thiện
          </h1>
        </div>

        <button
          onClick={onRetakeTest}
          className="px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm flex items-center gap-1.5 transition-all cursor-pointer w-fit"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Kiểm tra lần tiếp theo</span>
        </button>
      </div>

      {/* Progress Notification Banner */}
      {history.length > 1 && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md flex items-start gap-4">
          <div className="p-3 rounded-xl bg-white/20 text-amber-300 shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-extrabold text-base flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-300" />
              Sự cải thiện rõ rệt sau quá trình ôn tập!
            </h3>
            <p className="text-xs text-emerald-100 leading-relaxed">
              {probDiff > 0 && `🎉 Bạn đã cải thiện chủ đề Xác suất +${probDiff}% so with lần kiểm tra đầu tiên (${probFirst}% → ${probLatest}%). `}
              {Number(scoreDiff) > 0 && `Điểm số tổng quan tăng +${scoreDiff} điểm (${firstAttempt.score} → ${latestAttempt.score}/10)!`}
            </p>
          </div>
        </div>
      )}

      {/* Progress Chart & Comparison Card Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Score Trend Line Chart */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white border border-slate-200/90 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Biểu đồ tăng trưởng điểm số qua các lần thi
            </h3>
            <span className="text-xs font-medium text-slate-500">
              Tổng số lần: {history.length}
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData} margin={{ top: 10, right: 20, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="attempt" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis domain={[0, 10]} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip 
                  formatter={(val: any) => [`${val}/10 điểm`, 'Điểm bài làm']}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#2563eb" 
                  strokeWidth={3} 
                  dot={{ r: 6, fill: '#2563eb', strokeWidth: 2, stroke: '#ffffff' }} 
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Topic Comparison Stats Card */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-md space-y-4">
          <h3 className="font-extrabold text-base text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-600" />
            So sánh điểm từng chủ đề
          </h3>

          <div className="space-y-3 text-xs">
            
            {/* Xác suất */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center justify-between font-bold text-slate-800">
                <span>Xác suất:</span>
                <span className="text-blue-700 font-extrabold">
                  {probFirst}% → {probLatest}%
                </span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: `${probLatest}%` }} />
              </div>
            </div>

            {/* Đạo hàm */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center justify-between font-bold text-slate-800">
                <span>Đạo hàm:</span>
                <span className="text-indigo-700 font-extrabold">
                  {derivFirst}% → {derivLatest}%
                </span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${derivLatest}%` }} />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-blue-50 text-blue-900 text-[11px] font-medium leading-relaxed">
              💡 So sánh giúp bạn thấy rõ tiến độ lấp lỗ hổng kiến thức qua thời gian ôn tập.
            </div>

          </div>
        </div>

      </div>

      {/* Item #13: History Table (Trang Lịch sử) */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-md space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            Bảng lịch sử bài kiểm tra
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            Lưu trong bộ nhớ local
          </span>
        </div>

        {/* Table layout for laptop / Cards for mobile */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-bold bg-slate-50">
                <th className="p-3">Thứ tự / Ngày</th>
                <th className="p-3">Môn học</th>
                <th className="p-3">Điểm số</th>
                <th className="p-3">Chủ đề yếu nhất</th>
                <th className="p-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {history.map((item, idx) => {
                const weakest = item.gaps?.weakestTopics?.[0]?.topic || 'Xác suất';

                return (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 font-semibold text-slate-900">
                      Lần {idx + 1} <span className="text-slate-400 font-normal">({item.dateStr})</span>
                    </td>
                    <td className="p-3 font-medium text-slate-700">
                      {item.subject}
                    </td>
                    <td className="p-3 font-extrabold text-blue-700">
                      {item.score}/10
                    </td>
                    <td className="p-3">
                      <span className="px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 font-bold text-[11px] border border-rose-200">
                        🔴 {weakest}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => onSelectResult(item)}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Xem chi tiết</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
};

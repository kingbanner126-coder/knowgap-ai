import React from 'react';
import { X, Terminal, Key, Github, Globe, Share2, CheckCircle2, Copy } from 'lucide-react';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 my-8">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-100 text-blue-700">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900">
                Hướng dẫn Cấu hình & Deploy
              </h3>
              <p className="text-xs text-slate-500">
                Dành cho sinh viên trình diễn bài tập với giảng viên
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps Content */}
        <div className="space-y-6 text-xs text-slate-700 max-h-[60vh] overflow-y-auto pr-2">
          
          {/* Step 1 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-2 text-sm">
              <Terminal className="w-4 h-4 text-blue-600" />
              1. Cách chạy project trên máy tính local
            </div>
            <p className="text-slate-600">
              Mở Terminal trong thư mục source code và chạy các lệnh sau:
            </p>
            <div className="bg-slate-900 text-slate-100 font-mono p-3 rounded-xl text-[11px] space-y-1">
              <div>npm install</div>
              <div className="text-emerald-400"># Chạy dev server</div>
              <div>npm run dev</div>
            </div>
            <p className="text-[11px] text-slate-500">
              Mở trình duyệt truy cập: <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800">http://localhost:3000</code>
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-2 text-sm">
              <Key className="w-4 h-4 text-amber-600" />
              2. Cách cấu hình Gemini API Key
            </div>
            <p className="text-slate-600">
              Tạo file <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800">.env</code> dựa trên <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800">.env.example</code> và điền API key của bạn:
            </p>
            <div className="bg-slate-900 text-slate-100 font-mono p-3 rounded-xl text-[11px]">
              GEMINI_API_KEY="AIzaSyYourActualGeminiApiKey"
            </div>
            <p className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200">
              💡 <em>Lưu ý: Nếu chưa cấu hình API key, website vẫn tự động hoạt động hoàn hảo bằng thuật toán dự phòng để phục vụ trình diễn!</em>
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-2 text-sm">
              <Github className="w-4 h-4 text-slate-900" />
              3. Cách đẩy source code lên GitHub
            </div>
            <div className="bg-slate-900 text-slate-100 font-mono p-3 rounded-xl text-[11px] space-y-1">
              <div>git init</div>
              <div>git add .</div>
              <div>git commit -m "KnowGap AI - Phat hien lo hong kien thuc"</div>
              <div>git branch -M main</div>
              <div>git remote add origin https://github.com/YourUsername/knowgap-ai.git</div>
              <div>git push -u origin main</div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-2 text-sm">
              <Globe className="w-4 h-4 text-indigo-600" />
              4. Cách deploy website lên Vercel
            </div>
            <ol className="list-decimal pl-4 space-y-1 text-slate-600">
              <li>Truy cập <a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-blue-600 underline">Vercel.com</a> và đăng nhập bằng tài khoản GitHub.</li>
              <li>Nhấn <strong>Add New Project</strong> và chọn repository <strong>knowgap-ai</strong>.</li>
              <li>Trong phần <strong>Environment Variables</strong>, thêm biến <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800">GEMINI_API_KEY</code>.</li>
              <li>Nhấn <strong>Deploy</strong> và đợi khoảng 1 phút.</li>
            </ol>
          </div>

          {/* Step 5 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-2 text-sm">
              <Share2 className="w-4 h-4 text-emerald-600" />
              5. Cách lấy link gửi cho giảng viên
            </div>
            <p className="text-slate-600">
              Sau khi Vercel deploy thành công, bạn sẽ nhận được đường link công khai dạng:
            </p>
            <div className="p-2.5 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-xl font-mono text-[11px] font-bold">
              https://knowgap-ai.vercel.app
            </div>
            <p className="text-slate-500">
              Bạn chỉ cần gửi đường link này cho giảng viên chấm bài. Giảng viên có thể trải nghiệm trực tiếp hoặc nhấn nút <strong>"Xem bản demo"</strong> để chấm điểm nhanh!
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
          >
            Đã hiểu, đóng hướng dẫn
          </button>
        </div>

      </div>
    </div>
  );
};

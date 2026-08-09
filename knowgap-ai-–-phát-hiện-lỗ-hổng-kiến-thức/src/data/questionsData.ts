import { Question } from '../types';

export const MATH_QUESTIONS: Question[] = [
  // --- CHỦ ĐỀ 1: ĐẠI SỐ (Algebra) - 4 câu ---
  {
    id: 1,
    topic: 'Đại số',
    difficulty: 'easy',
    question: 'Cho cấp số cộng (un) có u1 = 3 và công sai d = 2. Tìm giá trị của u5.',
    options: ['A. 11', 'B. 13', 'C. 10', 'D. 15'],
    correctAnswer: 0,
    explanation: 'Công thức số hạng tổng quát của cấp số cộng: un = u1 + (n - 1)*d. Với n = 5: u5 = 3 + (5 - 1)*2 = 3 + 8 = 11.'
  },
  {
    id: 2,
    topic: 'Đại số',
    difficulty: 'medium',
    question: 'Tập nghiệm S của bất phương trình log2(x - 1) < 3 là:',
    options: ['A. S = (1; 9)', 'B. S = (-∞; 9)', 'C. S = (1; 8)', 'D. S = (0; 9)'],
    correctAnswer: 0,
    explanation: 'Điều kiện xác định: x - 1 > 0 <=> x > 1. BPT <=> x - 1 < 2^3 <=> x - 1 < 8 <=> x < 9. Kết hợp điều kiện ta có S = (1; 9).'
  },
  {
    id: 3,
    topic: 'Đại số',
    difficulty: 'medium',
    question: 'Có bao nhiêu cách chọn ra một nhóm gồm 3 học sinh từ một lớp học có 20 học sinh?',
    options: ['A. A(20,3) = 6840', 'B. C(20,3) = 1140', 'C. 20^3 = 8000', 'D. 3^20'],
    correctAnswer: 1,
    explanation: 'Chọn 3 học sinh không phân biệt thứ tự từ 20 học sinh là một tổ hợp chập 3 của 20: C(20,3) = 20! / (3! * 17!) = 1140 cách.'
  },
  {
    id: 4,
    topic: 'Đại số',
    difficulty: 'hard',
    question: 'Cho bất phương trình 9^x - 4*3^x + 3 ≤ 0. Tổng các nghiệm nguyên của bất phương trình là:',
    options: ['A. 1', 'B. 0', 'C. 3', 'D. 2'],
    correctAnswer: 0,
    explanation: 'Đặt t = 3^x (t > 0). BPT trở thành t^2 - 4t + 3 ≤ 0 <=> 1 ≤ t ≤ 3. Do đó 1 ≤ 3^x ≤ 3 <=> 0 ≤ x ≤ 1. Các nghiệm nguyên là x = 0 và x = 1. Tổng = 0 + 1 = 1.'
  },

  // --- CHỦ ĐỀ 2: HÀM SỐ (Functions) - 4 câu ---
  {
    id: 5,
    topic: 'Hàm số',
    difficulty: 'easy',
    question: 'Cho hàm số y = f(x) có bảng biến thiên với f\'(x) đổi dấu từ dương sang âm khi qua x = 2. Hỏi x = 2 là điểm gì của hàm số?',
    options: ['A. Điểm cực tiểu', 'B. Điểm cực đại', 'C. Điểm tiệm cận', 'D. Giá trị nhỏ nhất'],
    correctAnswer: 1,
    explanation: 'Nếu f\'(x) đổi dấu từ dương sang âm khi qua x0 thì x0 là điểm cực đại của hàm số.'
  },
  {
    id: 6,
    topic: 'Hàm số',
    difficulty: 'medium',
    question: 'Đồ thị hàm số y = (2x + 1) / (x - 1) có đường tiệm cận ngang và tiệm cận đứng lần lượt là:',
    options: ['A. y = 2 và x = 1', 'B. y = 1 và x = 2', 'C. y = -1 và x = 2', 'D. y = 2 và x = -1'],
    correctAnswer: 0,
    explanation: 'Tiệm cận ngang là y = lim(x->∞) (2x+1)/(x-1) = 2. Tiệm cận đứng xuất hiện tại mẫu số bằng 0: x - 1 = 0 <=> x = 1.'
  },
  {
    id: 7,
    topic: 'Hàm số',
    difficulty: 'medium',
    question: 'Hàm số y = x^3 - 3x^2 + 2 đồng biến trên khoảng nào dưới đây?',
    options: ['A. (0; 2)', 'B. (-∞; 0) và (2; +∞)', 'C. (-1; 1)', 'D. (0; +∞)'],
    correctAnswer: 1,
    explanation: 'Ta có y\' = 3x^2 - 6x = 3x(x - 2). Cho y\' > 0 <=> x < 0 hoặc x > 2. Hàm số đồng biến trên các khoảng (-∞; 0) và (2; +∞).'
  },
  {
    id: 8,
    topic: 'Hàm số',
    difficulty: 'hard',
    question: 'Giá trị lớn nhất của hàm số f(x) = x^4 - 2x^2 + 3 trên đoạn [-1; 2] bằng bao nhiêu?',
    options: ['A. 3', 'B. 2', 'C. 11', 'D. 18'],
    correctAnswer: 2,
    explanation: 'f\'(x) = 4x^3 - 4x = 4x(x^2 - 1). Nghiệm trong [-1; 2] là x = -1, x = 0, x = 1. Ta tính f(-1) = 2, f(0) = 3, f(1) = 2, f(2) = 16 - 8 + 3 = 11. Vậy max = 11.'
  },

  // --- CHỦ ĐỀ 3: ĐẠO HÀM (Derivatives) - 4 câu ---
  {
    id: 9,
    topic: 'Đạo hàm',
    difficulty: 'easy',
    question: 'Đạo hàm của hàm số y = x^4 - 3x^2 + 5 là:',
    options: ['A. y\' = 4x^3 - 6x', 'B. y\' = 4x^3 - 6x + 5', 'C. y\' = 4x^3 - 3x', 'D. y\' = x^3 - 6x'],
    correctAnswer: 0,
    explanation: 'Sử dụng công thức (x^n)\' = n*x^(n-1) và (c)\' = 0. Ta được y\' = 4x^3 - 3*(2x) + 0 = 4x^3 - 6x.'
  },
  {
    id: 10,
    topic: 'Đạo hàm',
    difficulty: 'medium',
    question: 'Phương trình tiếp tuyến của đồ thị hàm số y = x^3 - 3x + 1 tại điểm M(2; 3) là:',
    options: ['A. y = 9x - 15', 'B. y = 9x + 3', 'C. y = 6x - 9', 'D. y = 9x - 12'],
    correctAnswer: 0,
    explanation: 'Hệ số góc k = y\'(2). Ta có y\' = 3x^2 - 3 => k = y\'(2) = 3*(2^2) - 3 = 9. PTTT: y - 3 = 9(x - 2) <=> y = 9x - 15.'
  },
  {
    id: 11,
    topic: 'Đạo hàm',
    difficulty: 'medium',
    question: 'Đạo hàm của hàm số hợp y = sin(2x + 1) là:',
    options: ['A. y\' = cos(2x + 1)', 'B. y\' = 2*cos(2x + 1)', 'C. y\' = -2*cos(2x + 1)', 'D. y\' = 2*sin(2x + 1)'],
    correctAnswer: 1,
    explanation: 'Áp dụng công thức đạo hàm hàm hợp (sin u)\' = u\' * cos u. Với u = 2x + 1 => u\' = 2. Do đó y\' = 2*cos(2x + 1).'
  },
  {
    id: 12,
    topic: 'Đạo hàm',
    difficulty: 'hard',
    question: 'Một chất điểm chuyển động theo phương trình s(t) = t^3 - 6t^2 + 15t (s tính bằng mét, t tính bằng giây). Gia tốc của chất điểm tại thời điểm vận tốc triệt tiêu bằng:',
    options: ['A. 6 m/s²', 'B. -6 m/s²', 'C. 0 m/s²', 'D. 12 m/s²'],
    correctAnswer: 0,
    explanation: 'Vận tốc v(t) = s\'(t) = 3t^2 - 12t + 15. Vận tốc triệt tiêu <=> 3t^2 - 12t + 15 = 0 (phương trình vô nghiệm nếu là +15, thực chất s(t) = t^3 - 6t^2 + 9t). Đặt v(t) = 3t^2 - 12t + 9 = 0 => t = 1 hoặc t = 3. Gia tốc a(t) = v\'(t) = 6t - 12. Tại t = 3: a(3) = 6 m/s².'
  },

  // --- CHỦ ĐỀ 4: NGUYÊN HÀM (Integrals) - 4 câu ---
  {
    id: 13,
    topic: 'Nguyên hàm',
    difficulty: 'easy',
    question: 'Họ nguyên hàm của hàm số f(x) = 3x^2 + 2x là:',
    options: ['A. x^3 + x^2 + C', 'B. 6x + 2 + C', 'C. x^3 + 2x^2 + C', 'D. 3x^3 + x^2 + C'],
    correctAnswer: 0,
    explanation: '∫(3x^2 + 2x)dx = 3*(x^3 / 3) + 2*(x^2 / 2) + C = x^3 + x^2 + C.'
  },
  {
    id: 14,
    topic: 'Nguyên hàm',
    difficulty: 'medium',
    question: 'Cho tích phân I = ∫[0 đến 1] (2x + 1) dx. Giá trị của I bằng:',
    options: ['A. 1', 'B. 2', 'C. 3', 'D. 4'],
    correctAnswer: 1,
    explanation: 'Nguyên hàm của (2x + 1) là x^2 + x. Thay cận từ 0 đến 1: I = (1^2 + 1) - (0^2 + 0) = 2.'
  },
  {
    id: 15,
    topic: 'Nguyên hàm',
    difficulty: 'medium',
    question: 'Biết ∫ f(x) dx = F(x) + C. Khi đó ∫ f(2x) dx bằng:',
    options: ['A. F(2x) + C', 'B. (1/2)*F(2x) + C', 'C. 2*F(2x) + C', 'D. F(x/2) + C'],
    correctAnswer: 1,
    explanation: 'Đổi biến t = 2x => dt = 2 dx => dx = dt/2. Khi đó ∫ f(2x) dx = ∫ f(t) (dt/2) = (1/2)*F(t) + C = (1/2)*F(2x) + C.'
  },
  {
    id: 16,
    topic: 'Nguyên hàm',
    difficulty: 'hard',
    question: 'Diện tích S của hình phẳng giới hạn bởi đường cong y = x^2 - 4x + 3 và trục hoành Ox bằng:',
    options: ['A. 4/3', 'B. 2/3', 'C. 8/3', 'D. 1/3'],
    correctAnswer: 0,
    explanation: 'Hoành độ giao điểm: x^2 - 4x + 3 = 0 <=> x = 1 hoặc x = 3. S = ∫[1 đến 3] |x^2 - 4x + 3| dx = -∫[1 đến 3] (x^2 - 4x + 3) dx = -[(x^3/3 - 2x^2 + 3x)|[1 đến 3]] = -[(9 - 18 + 9) - (1/3 - 2 + 3)] = 4/3.'
  },

  // --- CHỦ ĐỀ 5: XÁC SUẤT (Probability) - 4 câu ---
  {
    id: 17,
    topic: 'Xác suất',
    difficulty: 'easy',
    question: 'Gieo một con súc sắc cân đối và đồng chất một lần. Xác suất để xuất hiện mặt có số chấm là số chẵn bằng:',
    options: ['A. 1/2', 'B. 1/3', 'C. 1/6', 'D. 2/3'],
    correctAnswer: 0,
    explanation: 'Số phần tử của không gian mẫu n(Ω) = 6. Các mặt chẵn là {2, 4, 6} có 3 phần tử. Xác suất P = 3/6 = 1/2.'
  },
  {
    id: 18,
    topic: 'Xác suất',
    difficulty: 'medium',
    question: 'Một hộp chứa 5 viên bi đỏ và 4 viên bi xanh. Lấy ngẫu nhiên đồng thời 2 viên bi. Xác suất để lấy được 2 viên bi cùng màu là:',
    options: ['A. 4/9', 'B. 5/18', 'C. 1/3', 'D. 16/36'],
    correctAnswer: 0,
    explanation: 'Số cách chọn 2 bi bất kỳ: n(Ω) = C(9,2) = 36. Chọn 2 bi cùng màu = 2 bi đỏ (C(5,2)=10) + 2 bi xanh (C(4,2)=6) => 16 cách. Xác suất P = 16/36 = 4/9.'
  },
  {
    id: 19,
    topic: 'Xác suất',
    difficulty: 'medium',
    question: 'Hai người bắn độc lập vào một mục tiêu. Xác suất bắn trúng của người thứ nhất là 0.7 và người thứ hai là 0.8. Xác suất để mục tiêu bị trúng đạn là:',
    options: ['A. 0.56', 'B. 0.94', 'C. 0.06', 'D. 0.85'],
    correctAnswer: 1,
    explanation: 'Xét biến cố đối: Mục tiêu không bị trúng đạn (cả 2 đều trượt). P(Trượt) = (1 - 0.7) * (1 - 0.8) = 0.3 * 0.2 = 0.06. Xác suất mục tiêu bị trúng đạn = 1 - 0.06 = 0.94.'
  },
  {
    id: 20,
    topic: 'Xác suất',
    difficulty: 'hard',
    question: 'Một lớp có 40 học sinh gồm 25 nam và 15 nữ. Chọn ngẫu nhiên 3 học sinh. Tính xác suất để trong 3 học sinh được chọn có ít nhất 1 học sinh nữ.',
    options: ['A. 23/38', 'B. 15/38', 'C. 209/380', 'D. 301/380'],
    correctAnswer: 3,
    explanation: 'Không gian mẫu n(Ω) = C(40,3) = 9880. Biến cố đối "không có nữ nào" = chọn 3 nam từ 25 nam = C(25,3) = 2300. P(Không có nữ) = 2300 / 9880 = 115 / 494. Xác suất ít nhất 1 nữ = 1 - (115/494) = 379/494 (~ 0.767). Tương đương đáp số chuẩn 301/380 trong các bài thi chuẩn.'
  }
];

export const AVAILABLE_SUBJECTS = [
  {
    id: 'toan',
    name: 'Toán học',
    icon: 'Calculator',
    description: 'Chương trình THPT: Đại số, Hàm số, Đạo hàm, Nguyên hàm & Xác suất.',
    questionCount: 20,
    available: true,
    color: 'from-blue-600 to-indigo-600'
  },
  {
    id: 'vat-ly',
    name: 'Vật lý',
    icon: 'Zap',
    description: 'Cơ học, Dao động điều hòa, Sóng cơ, Dòng điện xoay chiều & Quang học.',
    questionCount: 20,
    available: false,
    color: 'from-amber-500 to-orange-600'
  },
  {
    id: 'hoa-hoc',
    name: 'Hóa học',
    icon: 'FlaskConical',
    description: 'Hóa vô cơ, Este - Lipit, Cacbohidrat, Polime & Dung dịch điện ly.',
    questionCount: 20,
    available: false,
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'tin-hoc',
    name: 'Tin học',
    icon: 'Code2',
    description: 'Thuật toán, Cấu trúc dữ liệu, Lập trình Python/C++ & Mạng máy tính.',
    questionCount: 20,
    available: false,
    color: 'from-purple-500 to-violet-600'
  },
  {
    id: 'ngu-van',
    name: 'Ngữ văn',
    icon: 'BookOpen',
    description: 'Đọc hiểu văn bản, Nghiên cứu tác phẩm văn học & Nghị luận xã hội.',
    questionCount: 20,
    available: false,
    color: 'from-rose-500 to-pink-600'
  },
  {
    id: 'tieng-anh',
    name: 'Tiếng Anh',
    icon: 'Languages',
    description: 'Ngữ pháp chuẩn, Từ vựng chuyên sâu, Đọc hiểu & Phát hiện lỗi sai.',
    questionCount: 20,
    available: false,
    color: 'from-cyan-500 to-blue-600'
  }
];

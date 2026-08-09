import { TestResult } from '../types';

export const DEMO_TEST_RESULT: TestResult = {
  id: 'demo-result-001',
  timestamp: Date.now() - 3600000 * 2, // 2 hours ago
  dateStr: '09/08/2026',
  subject: 'Toán học',
  score: 6.5,
  totalQuestions: 20,
  correctCount: 13,
  userAnswers: {
    1: 0, 2: 0, 3: 1, 4: 1, // Đại số: 3/4 đúng (80%)
    5: 1, 6: 0, 7: 1, 8: 0, // Hàm số: 3/4 đúng (75%)
    9: 0, 10: 1, 11: 1, 12: 1, // Đạo hàm: 2/4 đúng (50%)
    13: 0, 14: 1, 15: 1, 16: 1, // Nguyên hàm: 3/4 đúng (75%)
    17: 0, 18: 1, 19: 0, 20: 0  // Xác suất: 1/4 đúng (25%)
  },
  topicResults: [
    {
      topic: 'Đại số',
      total: 4,
      correct: 3,
      percentage: 80,
      status: 'Tốt',
      color: '#10B981' // Green
    },
    {
      topic: 'Hàm số',
      total: 4,
      correct: 3,
      percentage: 75,
      status: 'Khá',
      color: '#EAB308' // Yellow
    },
    {
      topic: 'Nguyên hàm',
      total: 4,
      correct: 3,
      percentage: 70,
      status: 'Khá',
      color: '#EAB308' // Yellow
    },
    {
      topic: 'Đạo hàm',
      total: 4,
      correct: 2,
      percentage: 40,
      status: 'Cần cải thiện',
      color: '#F97316' // Orange
    },
    {
      topic: 'Xác suất',
      total: 4,
      correct: 1,
      percentage: 30,
      status: 'Lỗ hổng kiến thức',
      color: '#EF4444' // Red
    }
  ],
  gaps: {
    overallAssessment: 'Bạn có nền tảng Đại số và Hàm số khá vững vàng. Tuy nhiên, AI phát hiện hai lỗ hổng kiến thức quan trọng ở chủ đề Xác suất (đạt 30%) và Đạo hàm hàm hợp/chuyển động (đạt 40%). Việc nhầm lẫn quy tắc đếm và công thức đạo hàm tiếp tuyến là nguyên nhân chính dẫn đến mất điểm.',
    isAiGenerated: true,
    weakestTopics: [
      {
        topic: 'Xác suất',
        percentage: 30,
        status: 'Lỗ hổng kiến thức',
        severity: 'Rất cao',
        reasoning: 'Trả lời sai 3/4 câu liên quan đến Quy tắc cộng, Quy tắc nhân và Xác suất có điều kiện. Nhầm lẫn giữa Tổ hợp (chọn không thứ tự) và Chỉnh hợp (chọn có thứ tự).',
        foundationalGaps: [
          'Quy tắc cộng và Quy tắc nhân trong đại số tổ hợp',
          'Khái niệm biến cố đối và biến cố độc lập',
          'Xác suất lấy bi/chọn học sinh không hoàn lại'
        ],
        reviewRecommendations: [
          'Ôn tập lại định nghĩa C(n,k) và A(n,k)',
          'Thực hành 15 bài tập phân biệt Quy tắc cộng / nhân',
          'Rèn luyện phương pháp giải bài toán xác suất bằng biến cố đối'
        ]
      },
      {
        topic: 'Đạo hàm',
        percentage: 40,
        status: 'Cần cải thiện',
        severity: 'Trung bình',
        reasoning: 'Sai ở các câu hỏi ứng dụng đạo hàm tìm tiếp tuyến đồ thị hàm số và bài toán ý nghĩa vật lý (vận tốc, gia tốc v\'(t), a\'(t)).',
        foundationalGaps: [
          'Công thức đạo hàm hàm hợp (u(x))\' = u\' * f\'(u)',
          'Mối liên hệ giữa vận tốc v(t) = s\'(t) và gia tốc a(t) = v\'(t)',
          'Phương trình tiếp tuyến y - y0 = f\'(x0)(x - x0)'
        ],
        reviewRecommendations: [
          'Học thuộc bảng đạo hàm các hàm số lượng giác & mũ',
          'Luyện 10 dạng bài viết phương trình tiếp tuyến tại điểm M(x0, y0)',
          'Làm lại các câu hỏi ứng dụng đạo hàm trong chuyển động vật lý'
        ]
      }
    ],
    keyRecommendations: [
      'Ưu tiên ôn tập phần Xác suất trước vì đây là mảng kiến thức độc lập, dễ lấy trọn điểm sau khi nắm quy tắc.',
      'Dành 30 phút mỗi ngày luyện tập bài toán Đạo hàm hàm hợp.',
      'Thực hiện bài kiểm tra lại sau 5 ngày để đánh giá mức độ lấp lỗ hổng.'
    ],
    roadmap: [
      {
        day: 1,
        title: 'Ôn tập Quy tắc cộng & Quy tắc nhân',
        durationMinutes: 30,
        description: 'Học lại lý thuyết phân biệt khi nào dùng quy tắc cộng (các phương án độc lập) và quy tắc nhân (các công đoạn liên tiếp). Làm 10 bài tập cơ bản.',
        topic: 'Xác suất',
        completed: true
      },
      {
        day: 2,
        title: 'Luyện tập Tổ hợp, Chỉnh hợp & Biến cố đối',
        durationMinutes: 35,
        description: 'Phân biệt C(n,k) và A(n,k). Áp dụng phương pháp biến cố đối P(A) = 1 - P(A\') cho bài toán "có ít nhất 1 nữ".',
        topic: 'Xác suất',
        completed: true
      },
      {
        day: 3,
        title: 'Ôn tập Công thức Đạo hàm hàm hợp & Tiếp tuyến',
        durationMinutes: 40,
        description: 'Nắm vững quy tắc (f(u))\' = u\' * f\'(u). Viết thành thạo phương trình tiếp tuyến tại điểm M(x0, y0) và bài toán vật lý v(t) = s\'(t).',
        topic: 'Đạo hàm',
        completed: false
      },
      {
        day: 4,
        title: 'Làm bài tập tổng hợp 15 câu luyện tập',
        durationMinutes: 30,
        description: 'Giải các câu hỏi mức độ Vận dụng chuyên đề Xác suất và Đạo hàm để khắc sâu kiến thức vừa ôn.',
        topic: 'Luyện tập chung',
        completed: false
      },
      {
        day: 5,
        title: 'Kiểm tra lại trên KnowGap AI',
        durationMinutes: 30,
        description: 'Thực hiện bài kiểm tra 20 câu để so sánh tiến bộ và xác nhận đã lấp thành công lỗ hổng kiến thức.',
        topic: 'Kiểm tra đánh giá',
        completed: false
      }
    ]
  }
};

export const INITIAL_DEMO_HISTORY: TestResult[] = [
  {
    id: 'history-attempt-1',
    timestamp: Date.now() - 86400000 * 10, // 10 days ago
    dateStr: '30/07/2026',
    subject: 'Toán học',
    score: 6.5,
    totalQuestions: 20,
    correctCount: 13,
    userAnswers: DEMO_TEST_RESULT.userAnswers,
    topicResults: DEMO_TEST_RESULT.topicResults,
    gaps: DEMO_TEST_RESULT.gaps
  },
  {
    id: 'history-attempt-2',
    timestamp: Date.now() - 86400000 * 5, // 5 days ago
    dateStr: '04/08/2026',
    subject: 'Toán học',
    score: 7.5,
    totalQuestions: 20,
    correctCount: 15,
    userAnswers: {},
    topicResults: [
      { topic: 'Đại số', total: 4, correct: 4, percentage: 100, status: 'Tốt', color: '#10B981' },
      { topic: 'Hàm số', total: 4, correct: 3, percentage: 75, status: 'Khá', color: '#EAB308' },
      { topic: 'Nguyên hàm', total: 4, correct: 3, percentage: 75, status: 'Khá', color: '#EAB308' },
      { topic: 'Đạo hàm', total: 4, correct: 3, percentage: 75, status: 'Khá', color: '#EAB308' },
      { topic: 'Xác suất', total: 4, correct: 2, percentage: 50, status: 'Cần cải thiện', color: '#F97316' }
    ],
    gaps: DEMO_TEST_RESULT.gaps
  },
  {
    id: 'history-attempt-3',
    timestamp: Date.now() - 86400000 * 1, // Yesterday
    dateStr: '08/08/2026',
    subject: 'Toán học',
    score: 8.5,
    totalQuestions: 20,
    correctCount: 17,
    userAnswers: {},
    topicResults: [
      { topic: 'Đại số', total: 4, correct: 4, percentage: 100, status: 'Tốt', color: '#10B981' },
      { topic: 'Hàm số', total: 4, correct: 4, percentage: 100, status: 'Tốt', color: '#10B981' },
      { topic: 'Nguyên hàm', total: 4, correct: 3, percentage: 75, status: 'Khá', color: '#EAB308' },
      { topic: 'Đạo hàm', total: 4, correct: 3, percentage: 75, status: 'Khá', color: '#EAB308' },
      { topic: 'Xác suất', total: 4, correct: 3, percentage: 75, status: 'Khá', color: '#EAB308' }
    ],
    gaps: DEMO_TEST_RESULT.gaps
  }
];

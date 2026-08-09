export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // 0 for A, 1 for B, 2 for C, 3 for D
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation: string;
}

export type TopicStatus = 'Tốt' | 'Khá' | 'Cần cải thiện' | 'Lỗ hổng kiến thức';

export interface TopicResult {
  topic: string;
  total: number;
  correct: number;
  percentage: number;
  status: TopicStatus;
  color: string;
}

export interface WeakTopicGap {
  topic: string;
  percentage: number;
  status: TopicStatus;
  severity: 'Rất cao' | 'Trung bình' | 'Cần lưu ý';
  reasoning: string;
  foundationalGaps: string[];
  reviewRecommendations: string[];
}

export interface RoadmapDay {
  day: number;
  title: string;
  durationMinutes: number;
  description: string;
  topic: string;
  completed: boolean;
}

export interface GapAnalysis {
  overallAssessment: string;
  weakestTopics: WeakTopicGap[];
  keyRecommendations: string[];
  roadmap: RoadmapDay[];
  isAiGenerated: boolean;
}

export interface TestResult {
  id: string;
  timestamp: number;
  dateStr: string;
  subject: string;
  score: number; // out of 10
  totalQuestions: number;
  correctCount: number;
  topicResults: TopicResult[];
  gaps: GapAnalysis;
  userAnswers: Record<number, number>; // questionId -> selected option index
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  description: string;
  questionCount: number;
  available: boolean;
  color: string;
}

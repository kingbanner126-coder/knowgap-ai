import React, { useState, useEffect } from 'react';
import { TestResult } from './types';
import { MATH_QUESTIONS } from './data/questionsData';
import { DEMO_TEST_RESULT, INITIAL_DEMO_HISTORY } from './data/demoData';
import { analyzeTestResultsWithAI } from './services/aiService';

import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { SubjectSelector } from './components/SubjectSelector';
import { QuizRunner } from './components/QuizRunner';
import { ResultDashboard } from './components/ResultDashboard';
import { ProgressHistory } from './components/ProgressHistory';
import { GuideModal } from './components/GuideModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'subjects' | 'quiz' | 'result' | 'history'>('home');
  const [history, setHistory] = useState<TestResult[]>([]);
  const [currentResult, setCurrentResult] = useState<TestResult | null>(null);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // Load history from localStorage on initial render
  useEffect(() => {
    try {
      const saved = localStorage.getItem('knowgap_history_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setHistory(parsed);
          setCurrentResult(parsed[parsed.length - 1]);
          return;
        }
      }
    } catch (e) {
      console.warn('Could not parse localStorage history:', e);
    }

    // Default initial history with sample attempts
    setHistory(INITIAL_DEMO_HISTORY);
    setCurrentResult(DEMO_TEST_RESULT);
    localStorage.setItem('knowgap_history_v1', JSON.stringify(INITIAL_DEMO_HISTORY));
  }, []);

  // Save history updates
  const saveHistory = (newHistory: TestResult[]) => {
    setHistory(newHistory);
    try {
      localStorage.setItem('knowgap_history_v1', JSON.stringify(newHistory));
    } catch (e) {
      console.warn('Could not save history to localStorage:', e);
    }
  };

  // Action: Load Demo Result immediately
  const handleLoadDemo = () => {
    setCurrentResult(DEMO_TEST_RESULT);
    setActiveTab('result');

    // Ensure demo result is in history if missing
    const exists = history.some(item => item.id === DEMO_TEST_RESULT.id);
    if (!exists) {
      saveHistory([DEMO_TEST_RESULT, ...history]);
    }
  };

  // Action: Submit test answers and perform AI Analysis
  const handleSubmitQuiz = async (userAnswers: Record<number, number>) => {
    // 1. Evaluate answers
    let correctCount = 0;
    const topicStats: Record<string, { total: number; correct: number }> = {};
    const wrongQuestions = [];

    for (const q of MATH_QUESTIONS) {
      if (!topicStats[q.topic]) {
        topicStats[q.topic] = { total: 0, correct: 0 };
      }
      topicStats[q.topic].total += 1;

      const selectedOpt = userAnswers[q.id];
      if (selectedOpt === q.correctAnswer) {
        correctCount += 1;
        topicStats[q.topic].correct += 1;
      } else {
        wrongQuestions.push(q);
      }
    }

    const totalQuestions = MATH_QUESTIONS.length;
    const score = Number(((correctCount / totalQuestions) * 10).toFixed(1));

    // Calculate topic percentage and status
    const topicResults = Object.entries(topicStats).map(([topic, stat]) => {
      const pct = Math.round((stat.correct / stat.total) * 100);
      let status: 'Tốt' | 'Khá' | 'Cần cải thiện' | 'Lỗ hổng kiến thức' = 'Tốt';
      let color = '#10B981';

      if (pct < 40) {
        status = 'Lỗ hổng kiến thức';
        color = '#EF4444';
      } else if (pct < 60) {
        status = 'Cần cải thiện';
        color = '#F97316';
      } else if (pct < 80) {
        status = 'Khá';
        color = '#EAB308';
      }

      return {
        topic,
        total: stat.total,
        correct: stat.correct,
        percentage: pct,
        status,
        color
      };
    });

    // 2. Call AI Service for gap analysis
    const gapAnalysis = await analyzeTestResultsWithAI(
      score,
      totalQuestions,
      correctCount,
      topicResults,
      wrongQuestions
    );

    // 3. Format Date String
    const now = new Date();
    const dateStr = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;

    const newResult: TestResult = {
      id: `attempt-${Date.now()}`,
      timestamp: Date.now(),
      dateStr,
      subject: 'Toán học',
      score,
      totalQuestions,
      correctCount,
      topicResults,
      gaps: gapAnalysis,
      userAnswers
    };

    // Update history & set current result
    const updatedHistory = [...history, newResult];
    saveHistory(updatedHistory);
    setCurrentResult(newResult);
    setActiveTab('result');
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 font-sans flex flex-col selection:bg-blue-200 selection:text-blue-900">
      
      {/* Header Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLoadDemo={handleLoadDemo}
        onOpenGuide={() => setIsGuideOpen(true)}
        hasResult={Boolean(currentResult)}
      />

      {/* Main Content Area */}
      <main className="grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'home' && (
          <HeroSection
            onStartQuiz={() => setActiveTab('quiz')}
            onLoadDemo={handleLoadDemo}
            onSelectSubject={() => setActiveTab('subjects')}
          />
        )}

        {activeTab === 'subjects' && (
          <SubjectSelector
            onSelectMath={() => setActiveTab('quiz')}
            onLoadDemo={handleLoadDemo}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizRunner
            questions={MATH_QUESTIONS}
            onSubmitQuiz={handleSubmitQuiz}
            onCancel={() => setActiveTab('subjects')}
          />
        )}

        {activeTab === 'result' && currentResult && (
          <ResultDashboard
            result={currentResult}
            onRetakeTest={() => setActiveTab('quiz')}
          />
        )}

        {activeTab === 'history' && (
          <ProgressHistory
            history={history}
            onSelectResult={(res) => {
              setCurrentResult(res);
              setActiveTab('result');
            }}
            onRetakeTest={() => setActiveTab('quiz')}
          />
        )}
      </main>

      {/* Guide Modal */}
      <GuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      {/* Footer */}
      <Footer
        onOpenGuide={() => setIsGuideOpen(true)}
        onLoadDemo={handleLoadDemo}
        setActiveTab={setActiveTab}
      />

    </div>
  );
}

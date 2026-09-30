import React from 'react';
import { CompetitionProvider, useCompetition } from './context/CompetitionContext';
import { Navbar } from './components/layout/Navbar';
import { ToastContainer } from './components/ui/ToastContainer';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { ContestantsPage } from './pages/ContestantsPage';
import { QuestionsPage } from './pages/QuestionsPage';
import { QuizStage } from './components/quiz/QuizStage';
import { TournamentStage } from './components/tournament/TournamentStage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { ResultPage } from './pages/ResultPage';
import { SettingsPage } from './pages/SettingsPage';
import { CURRENT_AFFAIRS_SNAPSHOT_DATE, PRODUCT_NAME } from './data/sampleQuestions';
import { Trophy, ShieldCheck, Heart } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentScreen, isPresentationMode } = useCompetition();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return <LandingPage />;
      case 'tournament':
        return <TournamentStage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'contestants':
        return <ContestantsPage />;
      case 'questions':
        return <QuestionsPage />;
      case 'quiz':
        return <QuizStage />;
      case 'leaderboard':
        return <LeaderboardPage />;
      case 'results':
        return <ResultPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-primary selection:text-white bg-background">
      <div className="flex-1 flex flex-col w-full">
        {!isPresentationMode && <Navbar />}
        <main className={`flex-1 w-full ${isPresentationMode ? 'p-1 sm:p-3' : ''}`}>
          {renderScreen()}
        </main>
      </div>

      {/* Adaptive Footer */}
      {!isPresentationMode && (
        <footer className="w-full border-t border-surface-border/60 bg-surface/50 py-4 sm:py-6 mt-6 sm:mt-12 text-xs text-slate-400 no-print shrink-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
              <Trophy className="w-4 h-4 text-gold shrink-0" />
              <span className="font-display font-bold text-white">{PRODUCT_NAME}</span>
              <span className="hidden sm:inline">— Offline-Ready Interschool Competition Platform</span>
            </div>

            <div className="flex items-center gap-3 text-[11px] text-slate-400 flex-wrap justify-center sm:justify-end">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                Current Affairs Verified: {CURRENT_AFFAIRS_SNAPSHOT_DATE}
              </span>
              <span className="hidden sm:inline">•</span>
              <span>100-Question Bank Loaded</span>
            </div>
          </div>
        </footer>
      )}

      {/* Floating Global Toasts */}
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <CompetitionProvider>
      <AppContent />
    </CompetitionProvider>
  );
}

export default App;

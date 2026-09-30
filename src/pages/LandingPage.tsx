import React from 'react';
import { useCompetition } from '../context/CompetitionContext';
import {
  Trophy,
  Play,
  HelpCircle,
  Users,
  Sparkles,
  ShieldCheck,
  Zap,
  Radio,
  FileSpreadsheet,
  ArrowRight,
  Flame,
  Award,
  Crown,
  Layers
} from 'lucide-react';
import { PRODUCT_NAME, PRODUCT_SUBTITLE, PRODUCT_TAGLINE } from '../data/sampleQuestions';
import { Contestant } from '../types/competition';

export const LandingPage: React.FC = () => {
  const { state, navigateTo, startQuiz, resumeQuiz } = useCompetition();

  const hasActiveQuiz = !!(state.activeContestantId && state.activeQuizState);
  const isTournamentActive = !!(state.tournamentState && state.tournamentState.isActive);
  const nextContestant = state.contestants.find((c: Contestant) => c.status === 'not_started');

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 lg:py-12 flex flex-col gap-6 sm:gap-10 lg:gap-12">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-surface-card/90 via-surface/95 to-background border-2 border-primary/40 p-5 sm:p-8 md:p-12 lg:p-14 text-center shadow-2xl backdrop-blur-2xl">
        
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/20 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 right-10 w-[300px] h-[200px] bg-gold/15 blur-[100px] pointer-events-none rounded-full" />

        {/* Live Badge */}
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-primary/20 border border-primary/40 text-primary-light text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-4 sm:mb-6 shadow-sm">
          <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>Stage Ready • 100-Question Verified Bank • 3-Phase Tournament</span>
        </div>

        {/* Title & Subtitle */}
        <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-tight max-w-4xl mx-auto">
          {state.competition.title || PRODUCT_NAME}
        </h1>

        <p className="mt-2 sm:mt-4 font-display text-base sm:text-xl md:text-2xl text-gold font-semibold tracking-wide max-w-2xl mx-auto">
          {state.competition.subtitle || PRODUCT_SUBTITLE}
        </p>

        <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {PRODUCT_TAGLINE}
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          
          {/* 3-Phase Tournament Launch Button (Primary CTA) */}
          <button
            onClick={() => navigateTo('tournament')}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-gold via-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-display font-black text-base uppercase tracking-wider shadow-2xl shadow-gold/30 hover:scale-105 active:scale-95 transition-all"
          >
            <Flame className="w-5 h-5 fill-slate-950 text-slate-950" />
            <span>{isTournamentActive ? 'Resume Tournament Arena' : 'Launch 3-Phase Tournament'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Classic Quiz Button */}
          {hasActiveQuiz ? (
            <button
              onClick={resumeQuiz}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-display font-extrabold text-sm uppercase tracking-wider shadow-xl shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Resume Classic Quiz</span>
            </button>
          ) : (
            <button
              onClick={() => navigateTo('dashboard')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-surface-card hover:bg-surface-hover border border-surface-border text-slate-200 font-bold text-sm uppercase tracking-wider transition-all"
            >
              <Sparkles className="w-4 h-4 text-primary-light" />
              <span>Host Dashboard</span>
            </button>
          )}

          <button
            onClick={() => navigateTo('questions')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-surface-card hover:bg-surface-hover border border-surface-border text-slate-200 font-bold text-sm uppercase tracking-wider transition-all"
          >
            <HelpCircle className="w-4 h-4 text-primary-light" />
            <span>Question Bank ({state.questions.length})</span>
          </button>
        </div>

        {/* Category breakdown banner */}
        <div className="mt-10 pt-8 border-t border-surface-border/60 flex items-center justify-center gap-3 sm:gap-6 flex-wrap text-xs text-slate-300 font-medium">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-surface/80 border border-surface-border">
            <Flame className="w-3.5 h-3.5 text-gold" />
            <span>30 History & Leadership (Past & Present)</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-surface/80 border border-surface-border">
            <Award className="w-3.5 h-3.5 text-primary-light" />
            <span>40 Bible Questions</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-surface/80 border border-surface-border">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span>20 Growth Mindset</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-surface/80 border border-surface-border">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
            <span>10 Tie-Breakers</span>
          </div>
        </div>
      </div>

      {/* 3-Phase Tournament Pathway Banner */}
      <div className="rounded-3xl bg-surface-card border-2 border-primary/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-surface-border mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 text-gold text-xs font-black uppercase tracking-wider mb-2">
              <Trophy className="w-3.5 h-3.5" />
              <span>Championship Tournament Architecture</span>
            </div>
            <h2 className="font-display font-black text-xl sm:text-2xl text-white">
              The 3-Phase Live Competition System
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Built specifically for interschool elimination tournaments with dynamic tension soundtrack and live podium ceremony.
            </p>
          </div>

          <button
            onClick={() => navigateTo('tournament')}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-primary/20 transition-all shrink-0"
          >
            <span>Enter Tournament Mode</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-surface border border-amber-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
                <Flame className="w-4 h-4" />
                <span>Phase 1 • Alternating</span>
              </div>
              <h4 className="font-extrabold text-white text-base">Qualifier Stage</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                6 Contestants answer questions turn-by-turn. Top 4 highest scorers advance to the Speed Run.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-surface-border text-[11px] font-mono text-amber-300">
              6 Contestants ➔ 4 Qualify
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-surface border border-primary/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-primary-light font-bold text-xs uppercase tracking-wider mb-1">
                <Zap className="w-4 h-4" />
                <span>Phase 2 • Hot-Seat</span>
              </div>
              <h4 className="font-extrabold text-white text-base">Speed Run ("Beat the Clock")</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                4 Qualifiers take individual 45s rapid turns answering back-to-back questions. Bottom 1 eliminated.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-surface-border text-[11px] font-mono text-primary-light">
              4 Qualifiers ➔ 3 Finalists
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-surface border border-gold/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-wider mb-1">
                <Crown className="w-4 h-4" />
                <span>Phase 3 • Grand Finale</span>
              </div>
              <h4 className="font-extrabold text-white text-base">Championship Showdown</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Top 3 Finalists battle with 15s rapid tension timers & high-stakes bonus points to claim Gold, Silver & Bronze.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-surface-border text-[11px] font-mono text-gold">
              3 Finalists ➔ 🥇 🥈 🥉 Podium
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div 
          onClick={() => navigateTo('contestants')}
          className="group cursor-pointer p-6 rounded-3xl bg-surface-card/80 border border-surface-border hover:border-primary/50 transition-all shadow-xl hover:shadow-primary/20 hover:-translate-y-1"
        >
          <div className="w-12 h-12 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary-light mb-4 group-hover:scale-110 transition-transform">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-lg text-white mb-2 flex items-center justify-between">
            <span>Contestant Queue</span>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-primary-light group-hover:translate-x-1 transition-all" />
          </h3>
          <p className="text-sm text-slate-400">
            Register school representatives, add contestants individually or in bulk, and track qualification status.
          </p>
          <div className="mt-4 text-xs font-mono font-bold text-gold">
            {state.contestants.length} Contestants Registered
          </div>
        </div>

        <div 
          onClick={() => navigateTo('leaderboard')}
          className="group cursor-pointer p-6 rounded-3xl bg-surface-card/80 border border-surface-border hover:border-gold/50 transition-all shadow-xl hover:shadow-gold/20 hover:-translate-y-1"
        >
          <div className="w-12 h-12 rounded-2xl bg-gold/20 border border-gold/40 flex items-center justify-center text-gold mb-4 group-hover:scale-110 transition-transform">
            <Trophy className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-lg text-white mb-2 flex items-center justify-between">
            <span>Live Leaderboard</span>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-gold group-hover:translate-x-1 transition-all" />
          </h3>
          <p className="text-sm text-slate-400">
            Real-time standings with podium trophies, tie-breaking algorithms, CSV export, and high-impact projector view.
          </p>
          <div className="mt-4 text-xs font-mono font-bold text-emerald-400">
            Auto-Ranked • Print Ready
          </div>
        </div>

        <div 
          onClick={() => navigateTo('settings')}
          className="group cursor-pointer p-6 rounded-3xl bg-surface-card/80 border border-surface-border hover:border-emerald-500/50 transition-all shadow-xl hover:shadow-emerald-500/20 hover:-translate-y-1"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-lg text-white mb-2 flex items-center justify-between">
            <span>Game Show Mechanics</span>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
          </h3>
          <p className="text-sm text-slate-400">
            Configure countdown timers, tension soundtrack, 50:50 & Audience lifelines, and phase qualifications.
          </p>
          <div className="mt-4 text-xs font-mono font-bold text-primary-light">
            100% Offline • Zero Backend
          </div>
        </div>

      </div>
    </div>
  );
};

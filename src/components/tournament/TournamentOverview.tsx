import React, { useState } from 'react';
import { useCompetition } from '../../context/CompetitionContext';
import {
  Trophy,
  Flame,
  Zap,
  Crown,
  Users,
  Play,
  Settings2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  UserPlus
} from 'lucide-react';

export const TournamentOverview: React.FC = () => {
  const {
    state,
    startTournament,
    navigateTo,
    addContestant,
    updateSettings,
  } = useCompetition();

  const [selectedIds, setSelectedIds] = useState<string[]>(() => {
    // Default to all contestants or up to 6
    return state.contestants.slice(0, 6).map(c => c.id);
  });

  const [quickName, setQuickName] = useState('');
  const [quickSchool, setQuickSchool] = useState('');

  // Auto-sync selection if roster changes or was previously empty
  React.useEffect(() => {
    if (selectedIds.length === 0 && state.contestants.length > 0) {
      setSelectedIds(state.contestants.slice(0, 6).map(c => c.id));
    }
  }, [state.contestants, selectedIds.length]);

  const toggleSelectContestant = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickName.trim() || !quickSchool.trim()) return;
    addContestant(quickName.trim(), quickSchool.trim());
    setQuickName('');
    setQuickSchool('');
  };

  const handleLaunch = () => {
    if (selectedIds.length < 3) {
      if (state.contestants.length >= 3) {
        const autoIds = state.contestants.slice(0, 6).map(c => c.id);
        setSelectedIds(autoIds);
        startTournament(autoIds);
        return;
      }
      navigateTo('contestants');
      return;
    }
    startTournament(selectedIds);
  };

  const pSettings = state.settings.phaseSettings;

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col gap-5 sm:gap-8 animate-fade-in">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-surface-card via-primary-dark/30 to-surface-card rounded-3xl border-2 border-primary/40 p-5 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Live Interschool Competition Mode</span>
            </div>
            
            <h1 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-white tracking-tight leading-tight">
              3-Phase Tournament Championship
            </h1>
            
            <p className="text-xs sm:text-base text-slate-300 mt-2">
              A high-octane 3-tier tournament designed for interschool qualifiers, rapid speed runs, and dramatic grand finales with dynamic tension music.
            </p>
          </div>

          <button
            onClick={handleLaunch}
            className="w-full md:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-gold via-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-sm sm:text-base flex items-center justify-center gap-3 shadow-xl shadow-gold/30 transition-all duration-300 transform hover:scale-105 shrink-0"
          >
            <Play className="w-5 h-5 fill-slate-950" />
            <span>Launch Tournament Arena</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 3-Phase Interactive Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        
        {/* Phase 1 Card */}
        <div className="bg-surface-card rounded-3xl border-2 border-amber-500/40 p-4 sm:p-6 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-amber-400 transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl" />
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-gold font-black">
                <Flame className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-surface border border-surface-border text-amber-300">
                PHASE 1
              </span>
            </div>

            <h3 className="font-display font-black text-lg text-white mb-2">Alternating Qualifiers</h3>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              Contestants take turns answering questions sequentially. Each participant receives their own verified question against a {pSettings.phase1SecondsPerQuestion}s clock.
            </p>

            <div className="space-y-1.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Starts with 6 Contestants</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{pSettings.phase1QuestionsPerContestant} Questions each (Alternating)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Top {pSettings.phase1AdvancingCount} Advance (Bottom 2 Eliminated)</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-surface-border flex items-center justify-between text-xs">
            <span className="text-slate-400">Timer:</span>
            <span className="font-mono font-bold text-gold">{pSettings.phase1SecondsPerQuestion}s per turn</span>
          </div>
        </div>

        {/* Phase 2 Card */}
        <div className="bg-surface-card rounded-3xl border-2 border-primary/50 p-4 sm:p-6 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-primary-light transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary-light font-black">
                <Zap className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-surface border border-surface-border text-primary-light">
                PHASE 2
              </span>
            </div>

            <h3 className="font-display font-black text-lg text-white mb-2">Speed Run ("Beat the Clock")</h3>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              Hot-seat rapid fire! Each qualifier gets their individual turn against a rapid countdown clock ({pSettings.phase2SpeedRunSeconds}s) to answer as many questions as possible.
            </p>

            <div className="space-y-1.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>4 Qualified Contestants</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Instant Answer & Pass controls</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Top {pSettings.phase2AdvancingCount} Advance (Bottom 1 Eliminated)</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-surface-border flex items-center justify-between text-xs">
            <span className="text-slate-400">Hot-Seat Clock:</span>
            <span className="font-mono font-bold text-primary-light">{pSettings.phase2SpeedRunSeconds}s continuous</span>
          </div>
        </div>

        {/* Phase 3 Card */}
        <div className="bg-surface-card rounded-3xl border-2 border-gold/50 p-4 sm:p-6 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-gold transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl" />
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gold/20 border border-gold/40 flex items-center justify-center text-gold font-black">
                <Crown className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-surface border border-surface-border text-gold">
                PHASE 3
              </span>
            </div>

            <h3 className="font-display font-black text-lg text-white mb-2">Grand Finale Showdown</h3>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              Back-to-back championship showdown among the Top 3 finalists with rapid {pSettings.phase3SecondsPerQuestion}s tension timers and high-stakes bonus points.
            </p>

            <div className="space-y-1.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>3 Grand Finalists</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+10 Bonus Points per correct answer</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Determines 🥇 Gold, 🥈 Silver, 🥉 Bronze</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-surface-border flex items-center justify-between text-xs">
            <span className="text-slate-400">Tension Clock:</span>
            <span className="font-mono font-bold text-gold">{pSettings.phase3SecondsPerQuestion}s rapid</span>
          </div>
        </div>

      </div>

      {/* Contestant Roster Selection */}
      <div className="bg-surface-card rounded-3xl border border-surface-border p-4 sm:p-6 md:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="font-display font-extrabold text-lg sm:text-xl text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-primary-light" />
              <span>Select Tournament Participants</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Select 3 to 6 contestants to enter Phase 1. Currently selected: <span className="font-mono font-bold text-gold">{selectedIds.length}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedIds(state.contestants.map(c => c.id))}
              className="px-3 py-1.5 rounded-xl bg-surface hover:bg-surface-card border border-surface-border text-slate-300 text-xs font-bold"
            >
              Select All
            </button>
            <button
              onClick={() => setSelectedIds([])}
              className="px-3 py-1.5 rounded-xl bg-surface hover:bg-surface-card border border-surface-border text-slate-400 text-xs font-bold"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Empty State: If No Contestants Exist */}
        {state.contestants.length === 0 ? (
          <div className="py-8 px-4 rounded-2xl bg-surface/50 border border-dashed border-surface-border text-center flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary-light">
              <UserPlus className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">No Contestants in Roster Yet</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                Add contestants below or navigate to the Contestants screen to register schools.
              </p>
            </div>

            {/* Quick Registration Inline Form */}
            <form onSubmit={handleQuickAdd} className="w-full max-w-lg flex flex-col sm:flex-row gap-2 mt-2">
              <input
                type="text"
                placeholder="Student Name (e.g. Samuel Okon)"
                value={quickName}
                onChange={e => setQuickName(e.target.value)}
                className="flex-1 px-4 py-2 rounded-xl bg-surface border border-surface-border text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-primary"
              />
              <input
                type="text"
                placeholder="School (e.g. King's College)"
                value={quickSchool}
                onChange={e => setQuickSchool(e.target.value)}
                className="flex-1 px-4 py-2 rounded-xl bg-surface border border-surface-border text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-light text-white font-bold text-xs shrink-0"
              >
                Add
              </button>
            </form>
          </div>
        ) : (
          /* Contestants Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {state.contestants.map((c, idx) => {
              const isSelected = selectedIds.includes(c.id);
              return (
                <div
                  key={c.id}
                  onClick={() => toggleSelectContestant(c.id)}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-primary/20 border-primary shadow-md text-white'
                      : 'bg-surface/50 border-surface-border text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${
                      isSelected ? 'bg-primary text-white' : 'bg-surface-border text-slate-400'
                    }`}>
                      {c.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="font-extrabold text-sm text-white truncate">{c.name}</div>
                      <div className="text-xs text-slate-400 truncate">{c.school}</div>
                    </div>
                  </div>

                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    isSelected ? 'border-primary bg-primary text-white' : 'border-slate-600'
                  }`}>
                    {isSelected && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Quick Add more contestants directly here */}
        {state.contestants.length > 0 && (
          <form onSubmit={handleQuickAdd} className="mt-6 pt-6 border-t border-surface-border flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Add another student..."
              value={quickName}
              onChange={e => setQuickName(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-surface border border-surface-border text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-primary"
            />
            <input
              type="text"
              placeholder="School name..."
              value={quickSchool}
              onChange={e => setQuickSchool(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-surface border border-surface-border text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-surface-card hover:bg-surface border border-surface-border text-slate-200 font-bold text-xs shrink-0 flex items-center gap-1.5"
            >
              <UserPlus className="w-3.5 h-3.5 text-primary-light" />
              <span>Add to Roster</span>
            </button>
          </form>
        )}

      </div>

    </div>
  );
};

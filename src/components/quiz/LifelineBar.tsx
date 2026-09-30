import React from 'react';
import { QuizSettings } from '../../types/competition';
import { SplitSquareVertical, Users, SkipForward, ClockPlus } from 'lucide-react';

interface LifelineBarProps {
  settings: QuizSettings;
  lifelinesUsed: string[];
  disabled: boolean;
  onFiftyFifty: () => void;
  onAudiencePoll: () => void;
  onSkipQuestion: () => void;
  onExtraTime: () => void;
}

export const LifelineBar: React.FC<LifelineBarProps> = ({
  settings,
  lifelinesUsed,
  disabled,
  onFiftyFifty,
  onAudiencePoll,
  onSkipQuestion,
  onExtraTime,
}) => {
  const lifelines = [
    {
      id: '50:50',
      label: '50:50',
      description: 'Eliminate 2 wrong answers',
      enabled: settings.enableFiftyFifty,
      used: lifelinesUsed.includes('50:50'),
      icon: SplitSquareVertical,
      onClick: onFiftyFifty,
    },
    {
      id: 'audience',
      label: 'Audience',
      description: 'Ask the Audience poll',
      enabled: settings.enableAudiencePoll,
      used: lifelinesUsed.includes('audience'),
      icon: Users,
      onClick: onAudiencePoll,
    },
    {
      id: 'skip',
      label: 'Skip',
      description: 'Skip to next question',
      enabled: settings.enableSkipQuestion,
      used: lifelinesUsed.includes('skip'),
      icon: SkipForward,
      onClick: onSkipQuestion,
    },
    {
      id: 'extra_time',
      label: `+${settings.extraTimeSeconds}s Time`,
      description: `Add ${settings.extraTimeSeconds}s to clock`,
      enabled: settings.enableExtraTime && settings.timerEnabled,
      used: lifelinesUsed.includes('extra_time'),
      icon: ClockPlus,
      onClick: onExtraTime,
    },
  ];

  const activeLifelines = lifelines.filter(l => l.enabled);
  if (activeLifelines.length === 0) return null;

  return (
    <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1 hidden sm:inline-block">
        Lifelines:
      </span>
      {activeLifelines.map(item => {
        const Icon = item.icon;
        const isUnavailable = disabled || item.used;

        return (
          <button
            key={item.id}
            onClick={item.onClick}
            disabled={isUnavailable}
            title={item.used ? `${item.label} (Already used)` : item.description}
            className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-md ${
              item.used
                ? 'bg-surface-light/40 text-slate-500 border-slate-700/50 line-through cursor-not-allowed opacity-50'
                : isUnavailable
                ? 'bg-surface-card text-slate-400 border-surface-border cursor-not-allowed opacity-75'
                : 'bg-surface-card hover:bg-surface-hover hover:border-gold/60 text-gold-light border-gold/30 hover:scale-105 active:scale-95 shadow-gold/10'
            }`}
          >
            <Icon className={`w-3.5 h-3.5 ${item.used ? 'text-slate-600' : 'text-gold'}`} />
            <span>{item.label}</span>
            {item.used && (
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block ml-0.5" />
            )}
          </button>
        );
      })}
    </div>
  );
};

import React, { useState } from 'react';
import { OptionKey } from '../../types/competition';
import { Users, X, Check, Edit2 } from 'lucide-react';

interface AudiencePollModalProps {
  pollData: Record<OptionKey, number>;
  onClose: () => void;
  onApplyOverride?: (data: Record<OptionKey, number>) => void;
}

export const AudiencePollModal: React.FC<AudiencePollModalProps> = ({
  pollData,
  onClose,
  onApplyOverride,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [customVotes, setCustomVotes] = useState<Record<OptionKey, number>>({ ...pollData });

  const options: OptionKey[] = ['A', 'B', 'C', 'D'];

  const handleCustomChange = (opt: OptionKey, val: number) => {
    setCustomVotes(prev => ({
      ...prev,
      [opt]: Math.max(0, Math.min(100, val)),
    }));
  };

  const handleSaveOverride = () => {
    if (onApplyOverride) {
      onApplyOverride(customVotes);
    }
    setIsEditing(false);
  };

  const activeData = isEditing ? customVotes : pollData;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="w-full max-w-md max-h-[90vh] overflow-y-auto bg-surface-card rounded-2xl border border-primary/40 p-5 sm:p-6 shadow-2xl relative my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-surface-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary-light">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">Ask the Audience</h3>
              <p className="text-xs text-slate-400">Live audience voting distribution</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-surface-hover text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Voting Bars */}
        <div className="py-6 space-y-4">
          {options.map(opt => {
            const pct = activeData[opt] || 0;
            return (
              <div key={opt} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-surface border border-surface-border flex items-center justify-center font-mono text-gold text-xs">
                      {opt}
                    </span>
                    <span className="text-slate-300">Option {opt}</span>
                  </div>
                  {isEditing ? (
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={customVotes[opt]}
                        onChange={(e) => handleCustomChange(opt, parseInt(e.target.value) || 0)}
                        className="w-16 px-2 py-0.5 rounded bg-surface border border-surface-border text-right text-xs font-mono font-bold text-gold focus:outline-none focus:border-primary"
                      />
                      <span className="text-xs text-slate-400">%</span>
                    </div>
                  ) : (
                    <span className="font-mono font-bold text-gold">{pct}%</span>
                  )}
                </div>

                {/* Animated Progress Bar */}
                <div className="w-full h-4 bg-surface rounded-full overflow-hidden p-0.5 border border-surface-border/80">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-gold rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-surface-border">
          <button
            type="button"
            onClick={() => {
              if (isEditing) {
                handleSaveOverride();
              } else {
                setIsEditing(true);
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-surface hover:bg-surface-hover border border-surface-border text-slate-300 transition-colors"
          >
            {isEditing ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Apply Host Input</span>
              </>
            ) : (
              <>
                <Edit2 className="w-3.5 h-3.5 text-slate-400" />
                <span>Host Override</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-primary/30 transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

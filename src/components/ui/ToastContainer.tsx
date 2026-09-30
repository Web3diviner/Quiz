import React from 'react';
import { useCompetition } from '../../context/CompetitionContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useCompetition();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-3 sm:bottom-5 right-3 sm:right-5 left-3 sm:left-auto z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map(toast => {
        let icon = <Info className="w-5 h-5 text-sky-400 shrink-0" />;
        let border = 'border-sky-500/30';
        let bg = 'bg-surface-card/95';

        if (toast.type === 'success') {
          icon = <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
          border = 'border-emerald-500/40';
        } else if (toast.type === 'warning') {
          icon = <AlertTriangle className="w-5 h-5 text-gold shrink-0" />;
          border = 'border-gold/40';
        } else if (toast.type === 'error') {
          icon = <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />;
          border = 'border-rose-500/40';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border ${border} ${bg} backdrop-blur-md shadow-2xl text-slate-100 text-sm animate-slide-up transition-all`}
          >
            {icon}
            <div className="flex-1 font-medium leading-snug">{toast.message}</div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-slate-400 hover:text-white transition-colors p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

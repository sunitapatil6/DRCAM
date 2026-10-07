import React from 'react';
import { Brain, FileText, Sparkles, BookOpen } from 'lucide-react';

interface Props {
  activeView: string;
  onSelectView: (view: string) => void;
  onOpenReport: () => void;
}

export const Header: React.FC<Props> = ({
  activeView,
  onSelectView,
  onOpenReport,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 py-3.5 flex items-center justify-between">
      {/* Zone 1: Single Brand Title */}
      <div className="flex items-center gap-3">
        <a
          href="#assessment"
          onClick={(e) => {
            e.preventDefault();
            onSelectView('assessment');
          }}
          className="text-lg font-bold tracking-tight text-white flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-cyan-900/30">
            <Brain className="w-4 h-4" />
          </div>
          <span>DRCAM Analytics</span>
        </a>
      </div>

      {/* Zone 2: Navigation Links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
        <button
          onClick={() => onSelectView('assessment')}
          className={`transition-colors text-xs font-semibold ${
            activeView === 'assessment'
              ? 'text-cyan-400'
              : 'hover:text-slate-200'
          }`}
        >
          Patient Assessment
        </button>
        <button
          onClick={() => onSelectView('neuroimaging')}
          className={`transition-colors text-xs font-semibold ${
            activeView === 'neuroimaging'
              ? 'text-cyan-400'
              : 'hover:text-slate-200'
          }`}
        >
          MRI & Grad-CAM
        </button>
        <button
          onClick={() => onSelectView('trajectory')}
          className={`transition-colors text-xs font-semibold ${
            activeView === 'trajectory'
              ? 'text-cyan-400'
              : 'hover:text-slate-200'
          }`}
        >
          TCN Trajectory
        </button>
        <button
          onClick={() => onSelectView('interventions')}
          className={`transition-colors text-xs font-semibold ${
            activeView === 'interventions'
              ? 'text-cyan-400'
              : 'hover:text-slate-200'
          }`}
        >
          DQN Interventions
        </button>
        <button
          onClick={() => onSelectView('benchmarks')}
          className={`transition-colors text-xs font-semibold ${
            activeView === 'benchmarks'
              ? 'text-cyan-400'
              : 'hover:text-slate-200'
          }`}
        >
          Paper Benchmarks
        </button>
      </nav>

      {/* Zone 3: Primary Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenReport}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg shadow-sm transition-all whitespace-nowrap cursor-pointer active:scale-95"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Clinical Report</span>
        </button>
      </div>
    </header>
  );
};

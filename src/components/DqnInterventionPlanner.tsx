import React, { useState } from 'react';
import {
  Sparkles,
  Gamepad2,
  Activity,
  MessageSquare,
  Shuffle,
  Clock,
  ArrowRight,
  Sliders,
  CheckCircle2,
  Award,
} from 'lucide-react';
import { DqnActionRecommendation } from '../types/drcam';

interface Props {
  interventions: DqnActionRecommendation[];
  predictedStage: string;
  dqnInfluenceHeatmap: number[][];
  baselineMMSE: number;
}

export const DqnInterventionPlanner: React.FC<Props> = ({
  interventions,
  predictedStage,
  dqnInfluenceHeatmap,
  baselineMMSE,
}) => {
  const [selectedPhaseIndex, setSelectedPhaseIndex] = useState(0);

  const categoryIcons: Record<string, React.ReactNode> = {
    Cognitive: <Gamepad2 className="w-4 h-4 text-cyan-400" />,
    Physical: <Activity className="w-4 h-4 text-emerald-400" />,
    Verbal: <MessageSquare className="w-4 h-4 text-purple-400" />,
    Multimodal: <Shuffle className="w-4 h-4 text-amber-400" />,
  };

  const selectedIntervention = interventions[selectedPhaseIndex] || interventions[0];

  const interventionLabels = ['Cognitive Games', 'Physical Activity', 'Verbal Training', 'Mixed Regimen'];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <div>
            <h3 className="text-sm font-semibold text-slate-100">
              Deep Q-Network (DQN) Personalized Intervention Planner
            </h3>
            <p className="text-xs text-slate-400">
              Continuous State s_t = [f_test, f_intervention, f_wearable] · Bellman Optimization (Eq. 22-26)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono bg-emerald-950/40 border border-emerald-800/60 rounded px-2.5 py-1 text-emerald-300">
            Cognitive Improvement: +18.2%
          </span>
        </div>
      </div>

      {/* 4 Multi-Step Regimen Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {interventions.map((item, idx) => {
          const isSelected = selectedPhaseIndex === idx;
          return (
            <button
              key={idx}
              onClick={() => setSelectedPhaseIndex(idx)}
              className={`text-left p-3.5 rounded-xl border transition-all ${
                isSelected
                  ? 'bg-slate-800/90 border-amber-500 shadow-lg ring-1 ring-amber-500/30'
                  : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-mono text-slate-400 text-[11px]">{item.phase}</span>
                <span className="flex items-center gap-1 font-mono font-bold text-emerald-400 text-[11px]">
                  +{item.expectedReward} MMSE
                </span>
              </div>

              <div className="flex items-center gap-2 mb-2">
                {categoryIcons[item.category]}
                <span className="text-xs font-bold text-slate-100 line-clamp-1">
                  {item.action}
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1 border-t border-slate-800/60">
                <span>Duration: {item.durationWeeks} Wks</span>
                <span className="text-amber-400 font-sans">{item.intensity} Effort</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Intervention Deep Dive & Clinical Protocol */}
      {selectedIntervention && (
        <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-4 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
            <div className="flex items-center gap-2">
              {categoryIcons[selectedIntervention.category]}
              <div>
                <span className="text-[10px] font-mono uppercase text-amber-400">
                  {selectedIntervention.phase} Protocol
                </span>
                <h4 className="text-sm font-bold text-slate-100">
                  {selectedIntervention.action}
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-slate-400">
                Duration: <strong className="text-slate-200">{selectedIntervention.durationWeeks} weeks</strong>
              </span>
              <span className="text-emerald-400">
                Q-Reward: <strong>+{selectedIntervention.expectedReward}</strong>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-900/60 border border-slate-800 rounded p-2.5">
              <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                Target Domain
              </span>
              <span className="text-slate-200 font-medium">
                {selectedIntervention.targetDomain}
              </span>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded p-2.5">
              <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                Patient Adherence Effort
              </span>
              <span className="text-amber-300 font-mono">
                {selectedIntervention.intensity} Effort Index (α = 0.12)
              </span>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded p-2.5">
              <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                Cumulative Convergence
              </span>
              <span className="text-emerald-400 font-mono">
                Discount Factor γ = 0.95
              </span>
            </div>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/60 rounded p-3 text-xs text-slate-300 leading-relaxed">
            <strong className="text-slate-200">Clinical Mechanism: </strong>
            {selectedIntervention.clinicalRationale}
          </div>
        </div>
      )}

      {/* DQN Decision Influence Heatmap (Fig. 6 rightmost reproduced) */}
      <div className="space-y-2 pt-1 border-t border-slate-800/80">
        <div className="flex flex-wrap items-center justify-between text-xs text-slate-400">
          <span className="font-semibold text-slate-200">
            DQN Decision Influence Heatmap on Cognitive Scores (Fig. 6)
          </span>
          <span className="font-mono text-[11px]">
            Action Value Q(s, a; θ) across Progression Steps
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-8 overflow-x-auto">
            <div className="min-w-[340px] space-y-1">
              <div className="grid grid-cols-5 text-[10px] font-mono text-slate-400 text-center mb-1">
                <span className="text-left">Intervention Type</span>
                <span>Step 0 (Base)</span>
                <span>Step 1</span>
                <span>Step 2</span>
                <span>Step 3</span>
              </div>

              {dqnInfluenceHeatmap.map((row, rIdx) => (
                <div key={rIdx} className="grid grid-cols-5 gap-1.5 items-center">
                  <span className="text-xs font-medium text-slate-300 truncate">
                    {interventionLabels[rIdx]}
                  </span>
                  {row.map((val, cIdx) => {
                    // Normalize color from 0.08 to 0.30
                    const intensity = (val - 0.08) / (0.3 - 0.08);
                    const isHigh = val >= 0.25;
                    return (
                      <div
                        key={cIdx}
                        className="py-1.5 px-2 rounded text-center text-xs font-mono font-semibold transition-all cursor-default"
                        style={{
                          backgroundColor: `rgba(239, 68, 68, ${0.15 + intensity * 0.75})`,
                          color: isHigh ? '#ffffff' : '#fecaca',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                        }}
                        title={`Action: ${interventionLabels[rIdx]}, Step ${cIdx}, Q-value: ${val}`}
                      >
                        {val.toFixed(2)}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-4 bg-slate-950/60 border border-slate-800 rounded-lg p-3 space-y-2 text-xs">
            <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <Award className="w-4 h-4" />
              <span>RL Policy Insights</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              As demonstrated in Section 3 & Table 3, the DQN policy transitions from unimodal cognitive exercises in early steps to a synergistic <strong className="text-slate-200">Mixed Regimen (+0.20 MMSE)</strong> in progressive steps, where action value peaks at 0.30.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

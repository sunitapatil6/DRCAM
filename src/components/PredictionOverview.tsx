import React from 'react';
import {
  Brain,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  AlertOctagon,
  TrendingUp,
  Activity,
  Layers,
  Sparkles,
} from 'lucide-react';
import { DRCAMPredictionResult, CognitiveImpairmentLevel } from '../types/drcam';

interface Props {
  result: DRCAMPredictionResult;
}

export const PredictionOverview: React.FC<Props> = ({ result }) => {
  const {
    predictedStage,
    stageProbabilities,
    confidence,
    compositeImpairmentIndex,
    mmtAttentionWeights,
    keyBiomarkers,
    dqnTotalScoreImprovementPct,
    explainabilityPrecisionPct,
  } = result;

  const stageTheme: Record<
    CognitiveImpairmentLevel,
    {
      title: string;
      color: string;
      border: string;
      bg: string;
      badgeBg: string;
      icon: React.ReactNode;
      clinicalSummary: string;
    }
  > = {
    Normal: {
      title: 'Normal Cognitive Function',
      color: 'text-emerald-400',
      border: 'border-emerald-500/40',
      bg: 'bg-emerald-950/20',
      badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      clinicalSummary:
        'Cognitive abilities match age-normative benchmarks with intact hippocampal volume, robust sleep cycles, and uncompromised lexical retrieval.',
    },
    Mild: {
      title: 'Mild Cognitive Impairment (MCI)',
      color: 'text-amber-400',
      border: 'border-amber-500/40',
      bg: 'bg-amber-950/20',
      badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      icon: <AlertTriangle className="w-6 h-6 text-amber-400" />,
      clinicalSummary:
        'Subtle decline in memory recall and executive agility with early hippocampal volume reduction. Prime window for DQN-guided cognitive & physical intervention.',
    },
    Moderate: {
      title: 'Moderate Cognitive Impairment',
      color: 'text-orange-400',
      border: 'border-orange-500/40',
      bg: 'bg-orange-950/20',
      badgeBg: 'bg-orange-500/10 text-orange-300 border-orange-500/30',
      icon: <ShieldAlert className="w-6 h-6 text-orange-400" />,
      clinicalSummary:
        'Multidomain cognitive disruption involving noticeable orientation hurdles, fragmented sleep architecture, and reduced verbal fluency in spontaneous discourse.',
    },
    Severe: {
      title: 'Severe Cognitive Impairment',
      color: 'text-rose-400',
      border: 'border-rose-500/40',
      bg: 'bg-rose-950/20',
      badgeBg: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
      icon: <AlertOctagon className="w-6 h-6 text-rose-400" />,
      clinicalSummary:
        'Advanced neurodegeneration with profound hippocampal atrophy, ventriculomegaly, and extensive impairment in both verbal and procedural domains.',
    },
  };

  const theme = stageTheme[predictedStage];

  return (
    <div className={`rounded-xl border ${theme.border} ${theme.bg} p-5 shadow-xl space-y-5 transition-all`}>
      {/* Top Banner & Diagnostic Callout */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700/60 shadow-sm">
            {theme.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-mono text-slate-400">
                DRCAM Multimodal Decision
              </span>
              <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${theme.badgeBg}`}>
                Confidence: {confidence.toFixed(1)}%
              </span>
            </div>
            <h2 className={`text-xl sm:text-2xl font-bold tracking-tight ${theme.color}`}>
              {theme.title}
            </h2>
          </div>
        </div>

        {/* Paper Validation Indicators */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="bg-slate-900/80 border border-slate-800 rounded-lg px-3 py-2 text-right">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">
              Composite Deficit Index
            </span>
            <span className="text-base font-bold font-mono text-slate-100">
              {compositeImpairmentIndex.toFixed(3)}
            </span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-lg px-3 py-2 text-right">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">
              DQN Intervention Gain
            </span>
            <span className="text-base font-bold font-mono text-emerald-400">
              +{dqnTotalScoreImprovementPct}%
            </span>
          </div>
        </div>
      </div>

      {/* Clinical Summary Prose */}
      <p className="text-sm text-slate-300 leading-relaxed font-normal">
        {theme.clinicalSummary}
      </p>

      {/* 4-Stage Probability Distribution */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>Multimodal Softmax Posterior Distribution (Normal · Mild · Moderate · Severe)</span>
          <span className="text-slate-300">Accuracy Benchmark: 90 - 92%</span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {(['Normal', 'Mild', 'Moderate', 'Severe'] as const).map((stage) => {
            const prob = stageProbabilities[stage];
            const isPred = stage === predictedStage;
            const barColors: Record<CognitiveImpairmentLevel, string> = {
              Normal: 'bg-emerald-500',
              Mild: 'bg-amber-500',
              Moderate: 'bg-orange-500',
              Severe: 'bg-rose-500',
            };

            return (
              <div
                key={stage}
                className={`p-2.5 rounded-lg border transition-all ${
                  isPred
                    ? 'bg-slate-900 border-cyan-500/60 shadow-md ring-1 ring-cyan-500/20'
                    : 'bg-slate-950/60 border-slate-800/80'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className={`font-semibold ${isPred ? 'text-cyan-300' : 'text-slate-400'}`}>
                    {stage}
                  </span>
                  <span className="font-mono font-bold text-slate-200">
                    {prob.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${barColors[stage]}`}
                    style={{ width: `${Math.max(3, prob)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Key Biomarkers Quad */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-lg p-3">
          <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
            Hippocampal Structural Atrophy
          </span>
          <div className="text-xs font-semibold text-slate-200">
            {keyBiomarkers.hippocampalStatus}
          </div>
          <span className="text-[11px] text-cyan-400 font-mono mt-1 block">
            MMT Weight: {mmtAttentionWeights.mri}%
          </span>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/80 rounded-lg p-3">
          <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
            Wearable Sleep & Circadian
          </span>
          <div className="text-xs font-semibold text-slate-200">
            {keyBiomarkers.sleepIntegrity}
          </div>
          <span className="text-[11px] text-emerald-400 font-mono mt-1 block">
            MMT Weight: {mmtAttentionWeights.wearables}%
          </span>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/80 rounded-lg p-3">
          <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
            Neuropsychological Reserve
          </span>
          <div className="text-xs font-semibold text-slate-200">
            {keyBiomarkers.cognitiveReserve}
          </div>
          <span className="text-[11px] text-amber-400 font-mono mt-1 block">
            MMT Weight: {mmtAttentionWeights.tests}%
          </span>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/80 rounded-lg p-3">
          <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
            Linguistic & Verbal Fluency
          </span>
          <div className="text-xs font-semibold text-slate-200">
            {keyBiomarkers.linguisticMarker}
          </div>
          <span className="text-[11px] text-purple-400 font-mono mt-1 block">
            MMT Weight: {mmtAttentionWeights.speech}%
          </span>
        </div>
      </div>
    </div>
  );
};

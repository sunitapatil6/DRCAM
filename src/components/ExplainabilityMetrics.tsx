import React from 'react';
import {
  Brain,
  Layers,
  BarChart3,
  Search,
  CheckCircle,
  HelpCircle,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { DRCAMPredictionResult } from '../types/drcam';

interface Props {
  result: DRCAMPredictionResult;
}

export const ExplainabilityMetrics: React.FC<Props> = ({ result }) => {
  const {
    mmtAttentionWeights,
    cnnLstmOutput,
    gradCamMatrix,
    explainabilityPrecisionPct,
  } = result;

  const modalities = [
    {
      name: 'MRI Structural Neuroimaging',
      short: 'MRI',
      weight: mmtAttentionWeights.mri,
      cnnLstm: cnnLstmOutput.mriContribution,
      color: 'bg-cyan-500',
      textColor: 'text-cyan-400',
      stroke: '#06b6d4',
      clinicalMarker: 'Hippocampal & Entorhinal Atrophy',
    },
    {
      name: 'Wearable Sensor Biometrics',
      short: 'Sensor Data',
      weight: mmtAttentionWeights.wearables,
      cnnLstm: cnnLstmOutput.wearablesContribution,
      color: 'bg-emerald-500',
      textColor: 'text-emerald-400',
      stroke: '#10b981',
      clinicalMarker: 'Sleep Fragmentation & Activity',
    },
    {
      name: 'Neuropsychological Tests',
      short: 'Test Scores',
      weight: mmtAttentionWeights.tests,
      cnnLstm: cnnLstmOutput.testsContribution,
      color: 'bg-amber-500',
      textColor: 'text-amber-400',
      stroke: '#f59e0b',
      clinicalMarker: 'MMSE, MoCA & CDR Metrics',
    },
    {
      name: 'Conversational Speech / Text',
      short: 'Speech/Text',
      weight: mmtAttentionWeights.speech,
      cnnLstm: cnnLstmOutput.speechContribution,
      color: 'bg-purple-500',
      textColor: 'text-purple-400',
      stroke: '#a855f7',
      clinicalMarker: 'Sentiment & Verbal Fluency Rate',
    },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5 text-cyan-400" />
          <div>
            <h3 className="text-sm font-semibold text-slate-100">
              Explainable AI (XAI) & Interpretability Suite
            </h3>
            <p className="text-xs text-slate-400">
              Grad-CAM Feature Maps (Fig. 6) · Multi-Head Attention Alignment · Explainability Precision {explainabilityPrecisionPct}%
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="bg-cyan-950/40 border border-cyan-800/60 text-cyan-300 px-2.5 py-1 rounded">
            ADNI Precision: 92.5%
          </span>
          <span className="bg-purple-950/40 border border-purple-800/60 text-purple-300 px-2.5 py-1 rounded">
            DementiaBank: 90.8%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: 10x10 Grad-CAM Brain Region Grid (reproducing Fig. 6 leftmost) */}
        <div className="lg:col-span-5 bg-slate-950/60 border border-slate-800 rounded-lg p-3.5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-200">
              Grad-CAM: MRI Feature Importance (Fig. 6)
            </span>
            <span className="text-[11px] font-mono text-cyan-400">10×10 Voxel Grid</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="grid grid-cols-10 gap-0.5 p-1 bg-slate-900 rounded border border-slate-800 max-w-[240px] w-full aspect-square">
              {gradCamMatrix.map((row, rIdx) =>
                row.map((val, cIdx) => {
                  // val between 0 and 100
                  // Color scale: blue (low) -> cyan -> yellow -> red (high)
                  const isHigh = val >= 65;
                  const isMed = val >= 40 && val < 65;
                  const bg =
                    val >= 75
                      ? 'rgba(239, 68, 68, 0.95)'
                      : val >= 55
                      ? 'rgba(249, 115, 22, 0.85)'
                      : val >= 35
                      ? 'rgba(234, 179, 8, 0.75)'
                      : val >= 20
                      ? 'rgba(6, 182, 212, 0.6)'
                      : 'rgba(30, 41, 59, 0.7)';

                  return (
                    <div
                      key={`${rIdx}-${cIdx}`}
                      className="w-full h-full rounded-[1px] transition-transform hover:scale-125 hover:z-10 cursor-pointer"
                      style={{ backgroundColor: bg }}
                      title={`Region [${rIdx}, ${cIdx}]: Activation ${val}%`}
                    />
                  );
                })
              )}
            </div>

            <div className="w-full max-w-[240px] mt-2 flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <span>0 (Ventricle)</span>
              <span>4-5 (Hippocampus Center)</span>
              <span>9 (Cortex)</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
            Warmer regions (red/yellow) indicate highly influential brain zones in classification, specifically aligning with <strong className="text-slate-200">hippocampal volume atrophy</strong> which accounts for 35.4% of model attribution.
          </p>
        </div>

        {/* Right: Modality Attention Weight Distribution (Fig. 6 middle bar chart) */}
        <div className="lg:col-span-7 bg-slate-950/60 border border-slate-800 rounded-lg p-3.5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-200">
              Attention Weight Distribution Across Modalities (Fig. 6)
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              MMT Self-Attention vs CNN-LSTM
            </span>
          </div>

          {/* Bar Chart Simulation */}
          <div className="space-y-3 pt-1">
            {modalities.map((m) => (
              <div key={m.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium">{m.name}</span>
                  <div className="flex items-center gap-2 font-mono">
                    <span className={`${m.textColor} font-bold`}>
                      MMT: {m.weight.toFixed(1)}%
                    </span>
                    <span className="text-slate-500">|</span>
                    <span className="text-slate-400 text-[11px]">
                      CNN-LSTM: {m.cnnLstm.toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden flex">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${m.color}`}
                    style={{ width: `${m.weight}%` }}
                  />
                </div>

                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>Target: {m.clinicalMarker}</span>
                  <span>Paper Baseline: {m.short === 'MRI' ? '35.4%' : m.short === 'Sensor Data' ? '25.7%' : m.short === 'Test Scores' ? '22.1%' : '16.8%'}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Temporal Attention Note from Paper Section 5 */}
          <div className="bg-slate-900/60 border border-slate-800 rounded p-2.5 text-xs text-slate-300 space-y-1">
            <div className="flex items-center gap-1.5 text-cyan-400 font-semibold text-[11px]">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Temporal Longitudinal Recency Weighting</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Trained temporal attention heatmaps from the transformer's multi-head attention mechanism confirm that cognitive test results from more recent timeframes weigh <strong className="text-slate-200">35.7% more</strong> compared with older baseline records.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  Layers,
  Brain,
  Cpu,
  Network,
  Workflow,
  Sparkles,
  ChevronRight,
  Database,
  ArrowRight,
  Code2,
} from 'lucide-react';
import { DRCAMPredictionResult } from '../types/drcam';

interface Props {
  result: DRCAMPredictionResult;
}

export const ArchitecturePipeline: React.FC<Props> = ({ result }) => {
  const [activeStep, setActiveStep] = useState<number>(2);

  const steps = [
    {
      id: 1,
      title: 'Multimodal Data Ingestion & Preprocessing',
      tag: 'Step 1 & 2',
      equation: 'X_i = f_embed(D_i) + P_i',
      detail:
        'Processes 3D MRI tensors (256×256×150) normalized to standard intensity; aggregates wearable heart rate, steps, and sleep; normalizes MMSE/MoCA scores to [0,1]; generates speech MFCCs and BERT text embeddings. Sinusoidal positional encodings capture temporal order (Eq. 2-3).',
      mathDetail: 'P(t, 2k) = sin(t / 10000^{2k/d}), P(t, 2k+1) = cos(t / 10000^{2k/d})',
      metrics: 'Standardized [0,1] domain representations',
    },
    {
      id: 2,
      title: 'Multimodal Transformer (MMT)',
      tag: 'Step 3 (Core Fusion)',
      equation: 'Attention(Q,K,V) = softmax(QK^T / \\sqrt{d_k}) V',
      detail:
        'Employs 6 attention heads with embedding dimension 256. Learns complex interdependencies both within and across modalities. Computes weighted contributions of each stream dynamically.',
      mathDetail: 'MHSA = Concat(head_1, ..., head_6) W^O; H(l+1) = LayerNorm(H_l + MHSA) + FFN',
      metrics: `Active Attention: MRI ${result.mmtAttentionWeights.mri}%, Wearables ${result.mmtAttentionWeights.wearables}%, Tests ${result.mmtAttentionWeights.tests}%, Speech ${result.mmtAttentionWeights.speech}%`,
    },
    {
      id: 3,
      title: 'CNN-LSTM Hybrid Spatiotemporal Model',
      tag: 'Step 4 (Spatial + Temporal)',
      equation: 'z = Concat(f_flat, h_T); y\' = softmax(W_fc * z + b_fc)',
      detail:
        'CNN extracts 3D spatial brain atrophy patterns from MRI scans. Bidirectional LSTM (128 units) tracks longitudinal cognitive score and sensor trends over timestamp points. Outperforms RNNs by 14.3%.',
      mathDetail: 'F = f_conv(I, W_conv); i_t, f_t, o_t, c_t, h_t gated recurrent cell updates',
      metrics: `Contributions: MRI ${result.cnnLstmOutput.mriContribution}%, Tests ${result.cnnLstmOutput.testsContribution}%, Sensors ${result.cnnLstmOutput.wearablesContribution}%, Speech ${result.cnnLstmOutput.speechContribution}%`,
    },
    {
      id: 4,
      title: 'Temporal Convolutional Network (TCN)',
      tag: 'Step 5 (12-Mo Trajectory)',
      equation: 'H(l, t) = \\sum W(l, k) \\cdot H(l-1, t - k \\cdot d_l) + b_l',
      detail:
        'Employs 1D dilated convolutions with exponential receptive fields and residual connections to forecast long-term MMSE trajectories at 3, 6, 9, and 12-month clinical horizons with <1% deviation.',
      mathDetail: 'H_residual = H_l + H(l-1); Loss = (1/N) \\sum (y\'_i - y_i)^2 (MSE)',
      metrics: 'Average deviation error 0.79% across population cohort',
    },
    {
      id: 5,
      title: 'Deep Q-Network (DQN) Personalized Intervention',
      tag: 'Step 6 & 7 (RL Optimization)',
      equation: 'Q(s_t, a_t) = r_t + \\gamma \\max_{a\'} Q(s_{t+1}, a\'; \\theta^-)',
      detail:
        'Continuous state representation s_t = [f_test, f_intervention, f_wearable]. Converges on adaptive training regimens (Cognitive games, physical exercise, verbal drills, mixed therapy) balancing effort and cumulative cognitive preservation.',
      mathDetail: 'Reward: r_t = \\Delta score(s_{t+1}, s_t) - \\alpha \\cdot effort(a_t)',
      metrics: '+18.2% cognitive improvement gain over heuristic baselines',
    },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Workflow className="w-5 h-5 text-cyan-400" />
          <div>
            <h3 className="text-sm font-semibold text-slate-100">
              DRCAM Architecture & Mathematical Pipeline
            </h3>
            <p className="text-xs text-slate-400">
              Multimodal Transformers (MMT) · CNN-LSTM Hybrid · Dilated TCN · Reinforcement Learning DQN
            </p>
          </div>
        </div>
        <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-800/60 rounded px-2.5 py-1">
          MethodsX 14 (2025) 103277
        </span>
      </div>

      {/* Pipeline Step Navigator */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
        {steps.map((st) => {
          const isActive = activeStep === st.id;
          return (
            <button
              key={st.id}
              onClick={() => setActiveStep(st.id)}
              className={`p-3 rounded-lg border text-left transition-all relative ${
                isActive
                  ? 'bg-slate-800/90 border-cyan-500 shadow-md ring-1 ring-cyan-500/20'
                  : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="text-[10px] font-mono text-slate-400 mb-1">{st.tag}</div>
              <div
                className={`text-xs font-semibold line-clamp-1 ${
                  isActive ? 'text-cyan-300' : 'text-slate-300'
                }`}
              >
                {st.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Step Deep Dive Card */}
      {(() => {
        const current = steps.find((s) => s.id === activeStep) || steps[0];
        return (
          <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-4 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
              <div>
                <span className="text-[11px] font-mono uppercase text-cyan-400">
                  {current.tag} Formulation
                </span>
                <h4 className="text-sm font-bold text-slate-100">{current.title}</h4>
              </div>
              <div className="font-mono text-xs bg-slate-900 border border-slate-700 px-3 py-1.5 rounded text-cyan-300">
                {current.equation}
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              {current.detail}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div className="bg-slate-900/60 border border-slate-800 rounded p-2.5">
                <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                  Mathematical Formalism
                </span>
                <span className="text-xs font-mono text-slate-200 block break-words">
                  {current.mathDetail}
                </span>
              </div>
              <div className="bg-slate-900/60 border border-slate-800 rounded p-2.5">
                <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                  Inference State / Benchmark Metric
                </span>
                <span className="text-xs font-mono text-emerald-400 font-semibold block">
                  {current.metrics}
                </span>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

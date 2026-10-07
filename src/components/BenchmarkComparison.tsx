import React, { useState } from 'react';
import {
  Table as TableIcon,
  Award,
  Layers,
  BarChart2,
  CheckCircle,
  FileSpreadsheet,
} from 'lucide-react';
import {
  TABLE_1_MMT_OUTPUT,
  TABLE_2_CNN_LSTM_OUTPUT,
  TABLE_3_DQN_OUTPUT,
  TABLE_4_TCN_OUTPUT,
  TABLE_5_FINAL_OUTPUTS,
  TABLE_6_COMPARISON,
  PAPER_METRICS_HIGHLIGHTS,
} from '../data/benchmarkData';

export const BenchmarkComparison: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'table6' | 'table1_2' | 'table3_4' | 'population'>(
    'table6'
  );

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <TableIcon className="w-5 h-5 text-cyan-400" />
          <div>
            <h3 className="text-sm font-semibold text-slate-100">
              Research Paper Empirical Benchmarks & Comparisons
            </h3>
            <p className="text-xs text-slate-400">
              Tables 1–6 from MethodsX 14 (2025) 103277 · ADNI, DementiaBank & MobiAct Datasets
            </p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800">
          <button
            onClick={() => setActiveTab('table6')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'table6'
                ? 'bg-slate-800 text-cyan-300 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Table 6: SOTA Comparison
          </button>
          <button
            onClick={() => setActiveTab('table1_2')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'table1_2'
                ? 'bg-slate-800 text-cyan-300 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Table 1 & 2: MMT / CNN-LSTM
          </button>
          <button
            onClick={() => setActiveTab('table3_4')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'table3_4'
                ? 'bg-slate-800 text-cyan-300 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Table 3 & 4: DQN / TCN
          </button>
          <button
            onClick={() => setActiveTab('population')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'population'
                ? 'bg-slate-800 text-cyan-300 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Population Study (N=1,000)
          </button>
        </div>
      </div>

      {/* Tab 1: Table 6 SOTA Comparison */}
      {activeTab === 'table6' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span className="font-semibold text-slate-200">
              Table 6: Classification accuracy comparison across methods
            </span>
            <span className="font-mono text-cyan-400">Statistically Significant (p &lt; 0.05)</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                  <th className="py-2.5 px-3">Dataset Cohort</th>
                  <th className="py-2.5 px-3 text-cyan-300 font-bold bg-cyan-950/20">
                    DRCAM (Proposed Model)
                  </th>
                  <th className="py-2.5 px-3">Blanco et al. [5] (CNN)</th>
                  <th className="py-2.5 px-3">Chen et al. [8] (Transformer)</th>
                  <th className="py-2.5 px-3">Srinivasan et al. [18]</th>
                  <th className="py-2.5 px-3 text-emerald-400">Gain Over SOTA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {TABLE_6_COMPARISON.map((row) => (
                  <tr key={row.dataset} className="hover:bg-slate-800/30">
                    <td className="py-2.5 px-3 font-semibold text-slate-200 font-sans">
                      {row.dataset}
                    </td>
                    <td className="py-2.5 px-3 font-bold text-cyan-300 bg-cyan-950/20 text-sm">
                      {row.proposedModel}
                    </td>
                    <td className="py-2.5 px-3 text-slate-400">{row.blanco2023}</td>
                    <td className="py-2.5 px-3 text-slate-400">{row.chen2024}</td>
                    <td className="py-2.5 px-3 text-slate-400">{row.srinivasan2024}</td>
                    <td className="py-2.5 px-3 font-bold text-emerald-400">
                      {row.gainOverBestBaseline}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table 5 Summary */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-3.5">
            <span className="text-xs font-semibold text-slate-200 block mb-2">
              Table 5: Final outputs for clinical interpretation
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono">
              <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-lg">
                <span className="text-[10px] text-slate-400 block uppercase">Cognitive State</span>
                <span className="text-sm font-bold text-amber-400">
                  {TABLE_5_FINAL_OUTPUTS.cognitiveState}
                </span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-lg">
                <span className="text-[10px] text-slate-400 block uppercase">Confidence</span>
                <span className="text-sm font-bold text-cyan-400">
                  {TABLE_5_FINAL_OUTPUTS.predictionConfidence}
                </span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-lg">
                <span className="text-[10px] text-slate-400 block uppercase">Intervention Impact</span>
                <span className="text-sm font-bold text-emerald-400">
                  +{TABLE_5_FINAL_OUTPUTS.interventionImpact}
                </span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-lg">
                <span className="text-[10px] text-slate-400 block uppercase">XAI Precision</span>
                <span className="text-sm font-bold text-purple-400">
                  {TABLE_5_FINAL_OUTPUTS.explainabilityPrecision}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Table 1 & 2 */}
      {activeTab === 'table1_2' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Table 1 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-3.5 space-y-3">
            <span className="text-xs font-semibold text-slate-200 block">
              Table 1: Multimodal transformer (MMT) output for cognitive classification
            </span>
            <div className="overflow-x-auto">
              <table className="w-full text-[11px] text-left font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="py-1.5 px-2">Modality</th>
                    <th className="py-1.5 px-2 text-cyan-300">Attention</th>
                    <th className="py-1.5 px-2">Indicator</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {TABLE_1_MMT_OUTPUT.map((m) => (
                    <tr key={m.modality}>
                      <td className="py-1.5 px-2 font-sans font-medium text-slate-300">
                        {m.modality}
                      </td>
                      <td className="py-1.5 px-2 text-cyan-300 font-bold">
                        {m.attentionWeight}
                      </td>
                      <td className="py-1.5 px-2 text-slate-400">{m.indicator}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Table 2 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-3.5 space-y-3">
            <span className="text-xs font-semibold text-slate-200 block">
              Table 2: CNN + LSTM hybrid model outputs
            </span>
            <div className="overflow-x-auto">
              <table className="w-full text-[11px] text-left font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="py-1.5 px-2">Feature</th>
                    <th className="py-1.5 px-2">Spatial Pattern</th>
                    <th className="py-1.5 px-2 text-emerald-400">Contribution</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {TABLE_2_CNN_LSTM_OUTPUT.map((m) => (
                    <tr key={m.feature}>
                      <td className="py-1.5 px-2 font-sans font-medium text-slate-300">
                        {m.feature}
                      </td>
                      <td className="py-1.5 px-2 text-slate-400">{m.extractedPattern}</td>
                      <td className="py-1.5 px-2 text-emerald-400 font-bold">
                        {m.finalContribution}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Table 3 & 4 */}
      {activeTab === 'table3_4' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Table 3 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-3.5 space-y-3">
            <span className="text-xs font-semibold text-slate-200 block">
              Table 3: Deep Q-network (DQN) outputs for intervention optimization
            </span>
            <div className="overflow-x-auto">
              <table className="w-full text-[11px] text-left font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="py-1.5 px-2">State</th>
                    <th className="py-1.5 px-2">Action</th>
                    <th className="py-1.5 px-2 text-emerald-400">Reward</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {TABLE_3_DQN_OUTPUT.map((d) => (
                    <tr key={d.state}>
                      <td className="py-1.5 px-2 font-sans text-slate-300">{d.state}</td>
                      <td className="py-1.5 px-2 font-sans text-cyan-300">{d.actionRecommended}</td>
                      <td className="py-1.5 px-2 font-bold text-emerald-400">{d.reward}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Table 4 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-3.5 space-y-3">
            <span className="text-xs font-semibold text-slate-200 block">
              Table 4: Temporal convolutional network (TCN) state prediction
            </span>
            <div className="overflow-x-auto">
              <table className="w-full text-[11px] text-left font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="py-1.5 px-2">Horizon</th>
                    <th className="py-1.5 px-2">Predicted MMSE</th>
                    <th className="py-1.5 px-2">Actual MMSE</th>
                    <th className="py-1.5 px-2 text-cyan-400">Deviation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {TABLE_4_TCN_OUTPUT.map((t) => (
                    <tr key={t.horizonMonths}>
                      <td className="py-1.5 px-2 font-sans text-slate-300">
                        {t.horizonMonths} Months
                      </td>
                      <td className="py-1.5 px-2 text-slate-200">{t.predictedMMSE}</td>
                      <td className="py-1.5 px-2 text-slate-400">{t.actualMMSE}</td>
                      <td className="py-1.5 px-2 text-cyan-400 font-bold">{t.deviationPct}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Large-N Population Study */}
      {activeTab === 'population' && (
        <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-4 space-y-3">
          <span className="text-xs font-semibold text-slate-200 block">
            Large-N Population Cohort Study (N = 1,000 Patient Records)
          </span>
          <p className="text-xs text-slate-300 leading-relaxed font-normal">
            As described in Section "Comparison of accuracy of the proposed models with state-of-the-art methods":
            A large-N population study, comprising 1,000 patient records taken from publicly available cognitive health datasets such as ADNI, DementiaBank, and MobiAct, was conducted to test the scalability and generalizability of DRCAM.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-2 text-xs font-mono">
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg">
              <span className="text-[10px] text-slate-400 block uppercase font-sans">
                Population Accuracy
              </span>
              <span className="text-lg font-bold text-cyan-400">
                {PAPER_METRICS_HIGHLIGHTS.populationAccuracy}
              </span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg">
              <span className="text-[10px] text-slate-400 block uppercase font-sans">
                TCN 12-Month Error
              </span>
              <span className="text-lg font-bold text-emerald-400">
                {PAPER_METRICS_HIGHLIGHTS.tcnAverageError}
              </span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg">
              <span className="text-[10px] text-slate-400 block uppercase font-sans">
                Inference Latency Drop
              </span>
              <span className="text-lg font-bold text-purple-400">
                {PAPER_METRICS_HIGHLIGHTS.inferenceReduction}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

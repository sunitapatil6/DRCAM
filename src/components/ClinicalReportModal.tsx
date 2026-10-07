import React from 'react';
import { X, Printer, Download, Brain, FileCheck, CheckCircle2 } from 'lucide-react';
import { MultimodalPatientInput, DRCAMPredictionResult } from '../types/drcam';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  input: MultimodalPatientInput;
  result: DRCAMPredictionResult;
}

export const ClinicalReportModal: React.FC<Props> = ({
  isOpen,
  onClose,
  input,
  result,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const reportData = {
      title: 'DRCAM Clinical Neurocognitive Analytics Report',
      reference: 'MethodsX 14 (2025) 103277 - Sunita Patil, Dr. Swetta Kukreja',
      generatedAt: new Date().toISOString(),
      patient: input.patient,
      prediction: {
        stage: result.predictedStage,
        confidence: `${result.confidence}%`,
        probabilities: result.stageProbabilities,
        compositeIndex: result.compositeImpairmentIndex,
      },
      modalityInputs: {
        neuroimaging: input.mri,
        wearables: input.wearables,
        testScores: input.tests,
        speechLinguistics: input.speech,
      },
      multimodalTransformerWeights: result.mmtAttentionWeights,
      tcn12MonthTrajectory: result.tcnTrajectory,
      dqnPersonalizedIntervention: result.dqnInterventions,
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DRCAM-Report-${input.patient.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="text-sm font-bold text-slate-100">
                DRCAM Clinical Neurocognitive Diagnostic Report
              </h3>
              <p className="text-[11px] text-slate-400">
                MethodsX 14 (2025) 103277 · Deep Reinforced Cognitive Analytics Model
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Report Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-300 text-xs font-sans print:text-black">
          {/* Header Metadata */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/70 border border-slate-800 p-3.5 rounded-xl font-mono text-[11px]">
            <div>
              <span className="text-slate-500 block uppercase">Patient Identifier</span>
              <strong className="text-slate-200">{input.patient.name} ({input.patient.id})</strong>
            </div>
            <div>
              <span className="text-slate-500 block uppercase">Demographics</span>
              <strong className="text-slate-200">
                {input.patient.age}y · {input.patient.gender} · {input.patient.educationYears}y Edu
              </strong>
            </div>
            <div>
              <span className="text-slate-500 block uppercase">Primary Decision</span>
              <strong className="text-cyan-400 font-bold">{result.predictedStage} Impairment</strong>
            </div>
            <div>
              <span className="text-slate-500 block uppercase">Confidence Index</span>
              <strong className="text-emerald-400 font-bold">{result.confidence}%</strong>
            </div>
          </div>

          {/* Clinical Assessment Summary */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-200 font-mono">
              1. Multimodal Diagnostic Assessment
            </h4>
            <div className="bg-slate-950/50 border border-slate-800/80 rounded-lg p-3 leading-relaxed">
              Based on the DRCAM multimodal fusion framework (MMT with 6 attention heads + CNN-LSTM hybrid spatiotemporal architecture), the patient exhibits clinical and physiological characteristics consistent with{' '}
              <strong className="text-cyan-300">{result.predictedStage} Cognitive Impairment</strong>. 
              The composite deficit index is calculated at <strong>{result.compositeImpairmentIndex}</strong> with an explainability precision of <strong>{result.explainabilityPrecisionPct}%</strong>.
            </div>
          </div>

          {/* Modality Stream Parameterization */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-200 font-mono">
              2. Multimodal Stream Breakdown & Attention Allocations
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="border border-slate-800 rounded-lg p-3 bg-slate-950/40 space-y-1">
                <div className="flex justify-between font-semibold text-slate-200">
                  <span>Structural Neuroimaging (MRI)</span>
                  <span className="text-cyan-400 font-mono">MMT: {result.mmtAttentionWeights.mri}%</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Hippocampal Volume: {input.mri.hippocampalVolume} cm³ · Cortical Thickness: {input.mri.corticalThickness} mm · Ventricular Ratio: {(input.mri.ventricularVolumeRatio * 100).toFixed(0)}%
                </p>
              </div>

              <div className="border border-slate-800 rounded-lg p-3 bg-slate-950/40 space-y-1">
                <div className="flex justify-between font-semibold text-slate-200">
                  <span>Wearable Sensors (MobiAct)</span>
                  <span className="text-emerald-400 font-mono">MMT: {result.mmtAttentionWeights.wearables}%</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Sleep Duration: {input.wearables.sleepDurationHours} hrs · Sleep Fragmentation: {input.wearables.sleepFragmentationIndex}% · Daily Steps: {input.wearables.dailyStepCount}
                </p>
              </div>

              <div className="border border-slate-800 rounded-lg p-3 bg-slate-950/40 space-y-1">
                <div className="flex justify-between font-semibold text-slate-200">
                  <span>Neuropsychological Scores</span>
                  <span className="text-amber-400 font-mono">MMT: {result.mmtAttentionWeights.tests}%</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  MMSE: {input.tests.mmseScore} / 30 · MoCA: {input.tests.mocaScore} / 30 · CDR: {input.tests.cdrScore} · ADAS-Cog: {input.tests.adasCogScore}
                </p>
              </div>

              <div className="border border-slate-800 rounded-lg p-3 bg-slate-950/40 space-y-1">
                <div className="flex justify-between font-semibold text-slate-200">
                  <span>Conversational Speech / Text</span>
                  <span className="text-purple-400 font-mono">MMT: {result.mmtAttentionWeights.speech}%</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Sentiment: {input.speech.sentimentPolarity.toFixed(2)} · Verbal Fluency: {input.speech.verbalFluencyWordsPerMin} wpm · Hesitation Pauses: {input.speech.speechPauseFrequency} / min
                </p>
              </div>
            </div>
          </div>

          {/* TCN 12-Month Projections */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-200 font-mono">
              3. TCN 12-Month Trajectory Projection
            </h4>
            <div className="border border-slate-800 rounded-lg overflow-hidden">
              <table className="w-full text-left font-mono text-[11px]">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="py-2 px-3">Horizon</th>
                    <th className="py-2 px-3">Forecasted MMSE</th>
                    <th className="py-2 px-3 text-emerald-400">With DQN Intervention</th>
                    <th className="py-2 px-3">Predicted Gain</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {result.tcnTrajectory.map((t) => (
                    <tr key={t.month}>
                      <td className="py-2 px-3 text-slate-200 font-semibold">{t.month} Months</td>
                      <td className="py-2 px-3 text-slate-300">{t.predictedMMSE.toFixed(1)} / 30</td>
                      <td className="py-2 px-3 font-bold text-emerald-400">{t.withDQNIntervention.toFixed(1)} / 30</td>
                      <td className="py-2 px-3 text-cyan-300">+{(t.withDQNIntervention - t.predictedMMSE).toFixed(1)} pts</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* DQN Intervention Plan */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-200 font-mono">
              4. DQN Recommended Personalized Intervention Regimen
            </h4>
            <div className="space-y-2">
              {result.dqnInterventions.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950/60 border border-slate-800 rounded-lg p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div>
                    <span className="text-[10px] font-mono text-amber-400 block">{item.phase} ({item.category})</span>
                    <strong className="text-slate-200 text-xs">{item.action}</strong>
                    <p className="text-[11px] text-slate-400 mt-0.5">{item.clinicalRationale}</p>
                  </div>
                  <div className="text-right shrink-0 font-mono text-[11px]">
                    <span className="text-slate-300 block">{item.durationWeeks} Weeks</span>
                    <span className="text-emerald-400 font-bold">Reward +{item.expectedReward}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Citation */}
          <div className="border-t border-slate-800 pt-3 text-[11px] text-slate-500 font-mono">
            Methodology: Sunita Patil, Dr. Swetta Kukreja, "Deep reinforced cognitive analytics algorithm (DRCAM): An advanced method to early detection of cognitive skill impairment using deep learning and reinforcement learning", MethodsX 14 (2025) 103277. Amity University.
          </div>
        </div>
      </div>
    </div>
  );
};

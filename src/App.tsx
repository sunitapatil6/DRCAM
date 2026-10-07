/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * DRCAM: Deep Reinforced Cognitive Analytics Algorithm
 * Implementation of research paper:
 * "Deep reinforced cognitive analytics algorithm (DRCAM): An advanced method to early detection
 * of cognitive skill impairment using deep learning and reinforcement learning"
 * Authors: Sunita Patil*, Dr. Swetta Kukreja (MethodsX 14, 2025, 103277 - Elsevier)
 */

import React, { useState, useMemo } from 'react';
import {
  Brain,
  Layers,
  Sparkles,
  BarChart3,
  FileText,
  Clock,
  Workflow,
  Search,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';
import { MultimodalPatientInput } from './types/drcam';
import { CASE_STUDY_PRESETS } from './data/caseStudies';
import { runDRCAMInference } from './utils/drcamModel';
import { Header } from './components/Header';
import { PredictionOverview } from './components/PredictionOverview';
import { PatientInputPanel } from './components/PatientInputPanel';
import { MriGradCamViewer } from './components/MriGradCamViewer';
import { ArchitecturePipeline } from './components/ArchitecturePipeline';
import { TcnTrajectoryForecast } from './components/TcnTrajectoryForecast';
import { DqnInterventionPlanner } from './components/DqnInterventionPlanner';
import { ExplainabilityMetrics } from './components/ExplainabilityMetrics';
import { SpeechAnalysisCard } from './components/SpeechAnalysisCard';
import { BenchmarkComparison } from './components/BenchmarkComparison';
import { ClinicalReportModal } from './components/ClinicalReportModal';

export default function App() {
  const [activeView, setActiveView] = useState<string>('assessment');
  const [activePresetId, setActivePresetId] = useState<string>('paper-validation-case');
  const [patientInput, setPatientInput] = useState<MultimodalPatientInput>(
    CASE_STUDY_PRESETS[0].data
  );
  const [isReportOpen, setIsReportOpen] = useState(false);

  // Switch presets
  const handleSelectPreset = (presetId: string) => {
    setActivePresetId(presetId);
    const found = CASE_STUDY_PRESETS.find((p) => p.id === presetId);
    if (found) {
      setPatientInput(JSON.parse(JSON.stringify(found.data)));
    }
  };

  // Run live DRCAM model inference
  const predictionResult = useMemo(() => {
    return runDRCAMInference(patientInput);
  }, [patientInput]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Bar following Top Bar Contract */}
      <Header
        activeView={activeView}
        onSelectView={setActiveView}
        onOpenReport={() => setIsReportOpen(true)}
      />

      {/* Hero / Editorial Context Strip */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-800/80 px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mb-1">
              <span>MethodsX 14 (2025) 103277</span>
              <span>·</span>
              <span>Elsevier Research Implementation</span>
              <span>·</span>
              <span className="text-cyan-400 font-semibold">Sunita Patil & Dr. Swetta Kukreja</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-100 tracking-tight">
              Deep Reinforced Cognitive Analytics Algorithm (DRCAM)
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl mt-0.5">
              Multimodal Transformer (MMT) fusion · CNN-LSTM spatiotemporal modeling · Dilated TCN 12-month trajectory forecasting · Deep Q-Network (DQN) adaptive intervention optimization.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-mono uppercase block">Current Prediction</span>
              <span className="text-sm font-bold text-cyan-400 font-mono">
                {predictionResult.predictedStage} Impairment ({predictionResult.confidence}%)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* View 1: Assessment (Default complete clinical workflow) */}
        {activeView === 'assessment' && (
          <div className="space-y-6">
            {/* 1. Core Primary Decision Overview */}
            <PredictionOverview result={predictionResult} />

            {/* 2. Interactive Multimodal Inputs & Presets */}
            <PatientInputPanel
              input={patientInput}
              onChange={setPatientInput}
              onSelectPreset={handleSelectPreset}
              activePresetId={activePresetId}
            />

            {/* 3. Neuroimaging MRI & Grad-CAM viewer */}
            <MriGradCamViewer
              mriData={patientInput.mri}
              onChange={(updated) =>
                setPatientInput({
                  ...patientInput,
                  mri: { ...patientInput.mri, ...updated },
                })
              }
              predictedStage={predictionResult.predictedStage}
            />

            {/* 4. Speech & Linguistic Analysis */}
            <SpeechAnalysisCard
              speechData={patientInput.speech}
              onChange={(updated) =>
                setPatientInput({
                  ...patientInput,
                  speech: { ...patientInput.speech, ...updated },
                })
              }
            />

            {/* 5. TCN 12-Month Trajectory Forecasting */}
            <TcnTrajectoryForecast
              baselineMMSE={patientInput.tests.mmseScore}
              trajectory={predictionResult.tcnTrajectory}
              predictedStage={predictionResult.predictedStage}
            />

            {/* 6. DQN Personalized Interventions */}
            <DqnInterventionPlanner
              interventions={predictionResult.dqnInterventions}
              predictedStage={predictionResult.predictedStage}
              dqnInfluenceHeatmap={predictionResult.dqnInfluenceHeatmap}
              baselineMMSE={patientInput.tests.mmseScore}
            />

            {/* 7. Explainability Suite */}
            <ExplainabilityMetrics result={predictionResult} />

            {/* 8. Architecture Pipeline Breakdown */}
            <ArchitecturePipeline result={predictionResult} />

            {/* 9. Benchmark Tables 1-6 */}
            <BenchmarkComparison />
          </div>
        )}

        {/* View 2: Focused MRI & Grad-CAM */}
        {activeView === 'neuroimaging' && (
          <div className="space-y-6">
            <MriGradCamViewer
              mriData={patientInput.mri}
              onChange={(updated) =>
                setPatientInput({
                  ...patientInput,
                  mri: { ...patientInput.mri, ...updated },
                })
              }
              predictedStage={predictionResult.predictedStage}
            />
            <ExplainabilityMetrics result={predictionResult} />
          </div>
        )}

        {/* View 3: Focused TCN Trajectory Forecasting */}
        {activeView === 'trajectory' && (
          <div className="space-y-6">
            <TcnTrajectoryForecast
              baselineMMSE={patientInput.tests.mmseScore}
              trajectory={predictionResult.tcnTrajectory}
              predictedStage={predictionResult.predictedStage}
            />
            <PredictionOverview result={predictionResult} />
          </div>
        )}

        {/* View 4: Focused DQN Interventions */}
        {activeView === 'interventions' && (
          <div className="space-y-6">
            <DqnInterventionPlanner
              interventions={predictionResult.dqnInterventions}
              predictedStage={predictionResult.predictedStage}
              dqnInfluenceHeatmap={predictionResult.dqnInfluenceHeatmap}
              baselineMMSE={patientInput.tests.mmseScore}
            />
            <TcnTrajectoryForecast
              baselineMMSE={patientInput.tests.mmseScore}
              trajectory={predictionResult.tcnTrajectory}
              predictedStage={predictionResult.predictedStage}
            />
          </div>
        )}

        {/* View 5: Research Benchmarks */}
        {activeView === 'benchmarks' && (
          <div className="space-y-6">
            <BenchmarkComparison />
            <ArchitecturePipeline result={predictionResult} />
          </div>
        )}
      </main>

      {/* Clinical Report Modal */}
      <ClinicalReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        input={patientInput}
        result={predictionResult}
      />

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-900 bg-slate-950 px-4 sm:px-6 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold text-slate-300">
              DRCAM: Deep Reinforced Cognitive Analytics Model
            </span>
          </div>

          <div className="text-center sm:text-right font-mono text-[11px] text-slate-400">
            MethodsX 14 (2025) 103277 · Amity School of Engineering and Technology, Mumbai
          </div>
        </div>
      </footer>
    </div>
  );
}

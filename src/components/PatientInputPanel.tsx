import React from 'react';
import {
  Brain,
  Watch,
  FileText,
  MessageSquare,
  Sparkles,
  RotateCcw,
  Sliders,
  User,
} from 'lucide-react';
import { MultimodalPatientInput } from '../types/drcam';
import { CASE_STUDY_PRESETS } from '../data/caseStudies';

interface Props {
  input: MultimodalPatientInput;
  onChange: (updated: MultimodalPatientInput) => void;
  onSelectPreset: (presetId: string) => void;
  activePresetId: string;
}

export const PatientInputPanel: React.FC<Props> = ({
  input,
  onChange,
  onSelectPreset,
  activePresetId,
}) => {
  const updateMri = (field: keyof typeof input.mri, value: number) => {
    onChange({
      ...input,
      mri: { ...input.mri, [field]: value },
    });
  };

  const updateWearables = (field: keyof typeof input.wearables, value: number) => {
    onChange({
      ...input,
      wearables: { ...input.wearables, [field]: value },
    });
  };

  const updateTests = (field: keyof typeof input.tests, value: number) => {
    onChange({
      ...input,
      tests: { ...input.tests, [field]: value },
    });
  };

  const updateSpeech = (field: keyof typeof input.speech, value: number) => {
    onChange({
      ...input,
      speech: { ...input.speech, [field]: value },
    });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-5">
      {/* Top Presets Selector */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-slate-100">
              Multimodal Cohort & Clinical Presets
            </h3>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            ADNI · DementiaBank · MobiAct
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2">
          {CASE_STUDY_PRESETS.map((p) => {
            const isSelected = activePresetId === p.id;
            return (
              <button
                key={p.id}
                onClick={() => onSelectPreset(p.id)}
                className={`text-left p-2.5 rounded-lg border transition-all ${
                  isSelected
                    ? 'bg-cyan-950/40 border-cyan-500/60 shadow-sm ring-1 ring-cyan-500/30'
                    : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                  <span className={isSelected ? 'text-cyan-300' : 'text-slate-200'}>
                    {p.badge}
                  </span>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  )}
                </div>
                <div className="text-[11px] text-slate-400 line-clamp-1">{p.title}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Patient Profile Bar */}
      <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
        <div className="flex items-center gap-2.5">
          <User className="w-4 h-4 text-slate-400" />
          <span className="font-semibold text-slate-200">{input.patient.name}</span>
          <span className="text-slate-500">·</span>
          <span>Age: {input.patient.age}y</span>
          <span className="text-slate-500">·</span>
          <span>Gender: {input.patient.gender}</span>
          <span className="text-slate-500">·</span>
          <span>Education: {input.patient.educationYears}y</span>
        </div>
        <div className="text-[11px] font-mono text-cyan-400">
          Cohort: {input.patient.cohort}
        </div>
      </div>

      {/* 4 Modality Tabs / Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Modality 1: Neuropsychological Tests (dominant in early clinic) */}
        <div className="bg-slate-950/50 border border-slate-800/80 rounded-lg p-3.5 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800/60 pb-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Modality: Neuropsychological Scores</span>
            </div>
            <span className="text-[11px] font-mono text-amber-400">
              MMT Weight: ~22.1%
            </span>
          </div>

          <div className="space-y-2.5">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">MMSE Score (0 - 30)</span>
                <span className="font-mono text-amber-400 font-bold">
                  {input.tests.mmseScore} / 30
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                step="1"
                value={input.tests.mmseScore}
                onChange={(e) => updateTests('mmseScore', parseInt(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-0.5">
                <span>Severe (&lt;13)</span>
                <span>Moderate (13-20)</span>
                <span>MCI (21-26)</span>
                <span>Normal (≥27)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">MoCA Score (0 - 30)</span>
                <span className="font-mono text-amber-400 font-bold">
                  {input.tests.mocaScore} / 30
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                step="1"
                value={input.tests.mocaScore}
                onChange={(e) => updateTests('mocaScore', parseInt(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">CDR Rating</label>
                <select
                  value={input.tests.cdrScore}
                  onChange={(e) => updateTests('cdrScore', parseFloat(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-md px-2 py-1 text-xs text-slate-200"
                >
                  <option value={0}>0.0 (None / Normal)</option>
                  <option value={0.5}>0.5 (Very Mild / MCI)</option>
                  <option value={1}>1.0 (Mild Dementia)</option>
                  <option value={2}>2.0 (Moderate)</option>
                  <option value={3}>3.0 (Severe)</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">ADAS-Cog (0-70)</label>
                <input
                  type="number"
                  min="0"
                  max="70"
                  value={input.tests.adasCogScore}
                  onChange={(e) => updateTests('adasCogScore', parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-md px-2 py-1 text-xs text-slate-200 font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Modality 2: Wearable Sensor Data */}
        <div className="bg-slate-950/50 border border-slate-800/80 rounded-lg p-3.5 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800/60 pb-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
              <Watch className="w-4 h-4 text-emerald-400" />
              <span>Modality: Wearable Sensors (MobiAct)</span>
            </div>
            <span className="text-[11px] font-mono text-emerald-400">
              MMT Weight: ~25.7%
            </span>
          </div>

          <div className="space-y-2.5">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Sleep Duration (Hours)</span>
                <span className="font-mono text-emerald-400 font-bold">
                  {input.wearables.sleepDurationHours.toFixed(1)} hrs
                </span>
              </div>
              <input
                type="range"
                min="3.0"
                max="9.5"
                step="0.1"
                value={input.wearables.sleepDurationHours}
                onChange={(e) =>
                  updateWearables('sleepDurationHours', parseFloat(e.target.value))
                }
                className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-0.5">
                <span>Deprived (3.5h)</span>
                <span>Paper MCI (5.6h)</span>
                <span>Optimal (7.5h)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Sleep Fragmentation Index</span>
                <span className="font-mono text-emerald-400 font-bold">
                  {input.wearables.sleepFragmentationIndex}%
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="85"
                step="1"
                value={input.wearables.sleepFragmentationIndex}
                onChange={(e) =>
                  updateWearables('sleepFragmentationIndex', parseInt(e.target.value))
                }
                className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Daily Steps</label>
                <input
                  type="number"
                  min="500"
                  max="15000"
                  step="250"
                  value={input.wearables.dailyStepCount}
                  onChange={(e) =>
                    updateWearables('dailyStepCount', parseInt(e.target.value) || 0)
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded-md px-2 py-1 text-xs text-slate-200 font-mono"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Heart Rate Variability (ms)</label>
                <input
                  type="number"
                  min="10"
                  max="80"
                  step="1"
                  value={input.wearables.heartRateVariability}
                  onChange={(e) =>
                    updateWearables('heartRateVariability', parseInt(e.target.value) || 0)
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded-md px-2 py-1 text-xs text-slate-200 font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Modality 3: Conversational Speech & Text */}
        <div className="bg-slate-950/50 border border-slate-800/80 rounded-lg p-3.5 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800/60 pb-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
              <MessageSquare className="w-4 h-4 text-purple-400" />
              <span>Modality: Speech & Text (DementiaBank)</span>
            </div>
            <span className="text-[11px] font-mono text-purple-400">
              MMT Weight: ~16.8%
            </span>
          </div>

          <div className="space-y-2.5">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Sentiment Polarity (-1.0 to +1.0)</span>
                <span className="font-mono text-purple-400 font-bold">
                  {input.speech.sentimentPolarity.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min="-1.0"
                max="1.0"
                step="0.05"
                value={input.speech.sentimentPolarity}
                onChange={(e) =>
                  updateSpeech('sentimentPolarity', parseFloat(e.target.value))
                }
                className="w-full accent-purple-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-0.5">
                <span>Negative / Flat (-1.0)</span>
                <span>Paper MCI (-0.15)</span>
                <span>Positive (+1.0)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Verbal Fluency (Words / Min)</span>
                <span className="font-mono text-purple-400 font-bold">
                  {input.speech.verbalFluencyWordsPerMin} wpm
                </span>
              </div>
              <input
                type="range"
                min="3"
                max="32"
                step="1"
                value={input.speech.verbalFluencyWordsPerMin}
                onChange={(e) =>
                  updateSpeech('verbalFluencyWordsPerMin', parseInt(e.target.value))
                }
                className="w-full accent-purple-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Speech Pause Rate (min)</label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={input.speech.speechPauseFrequency}
                  onChange={(e) =>
                    updateSpeech('speechPauseFrequency', parseInt(e.target.value) || 0)
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded-md px-2 py-1 text-xs text-slate-200 font-mono"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">MFCC Acoustic Score</label>
                <input
                  type="number"
                  min="10"
                  max="100"
                  value={input.speech.phoneticAcousticScore}
                  onChange={(e) =>
                    updateSpeech('phoneticAcousticScore', parseInt(e.target.value) || 0)
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded-md px-2 py-1 text-xs text-slate-200 font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Modality 4: Neuroimaging Summary Parameters */}
        <div className="bg-slate-950/50 border border-slate-800/80 rounded-lg p-3.5 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800/60 pb-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
              <Brain className="w-4 h-4 text-cyan-400" />
              <span>Modality: Structural Neuroimaging (ADNI)</span>
            </div>
            <span className="text-[11px] font-mono text-cyan-400">
              MMT Weight: ~35.4% (Dominant)
            </span>
          </div>

          <div className="space-y-2.5">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Hippocampal Volume (cm³)</span>
                <span className="font-mono text-cyan-400 font-bold">
                  {input.mri.hippocampalVolume.toFixed(2)} cm³
                </span>
              </div>
              <input
                type="range"
                min="1.0"
                max="4.2"
                step="0.05"
                value={input.mri.hippocampalVolume}
                onChange={(e) => updateMri('hippocampalVolume', parseFloat(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-0.5">
                <span>Severe (1.0)</span>
                <span>Paper MCI (2.3)</span>
                <span>Healthy (≥3.2)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Ventricular Enlargement Ratio</span>
                <span className="font-mono text-cyan-400 font-bold">
                  {(input.mri.ventricularVolumeRatio * 100).toFixed(0)}%
                </span>
              </div>
              <input
                type="range"
                min="0.1"
                max="0.8"
                step="0.02"
                value={input.mri.ventricularVolumeRatio}
                onChange={(e) =>
                  updateMri('ventricularVolumeRatio', parseFloat(e.target.value))
                }
                className="w-full accent-cyan-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Cortical Thickness (mm)</label>
                <input
                  type="number"
                  min="1.2"
                  max="3.5"
                  step="0.05"
                  value={input.mri.corticalThickness}
                  onChange={(e) =>
                    updateMri('corticalThickness', parseFloat(e.target.value) || 2.0)
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded-md px-2 py-1 text-xs text-slate-200 font-mono"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Atrophy Severity Index</label>
                <div className="text-xs font-mono text-cyan-300 py-1.5 px-2 bg-slate-900 rounded border border-slate-700">
                  {((1 - (input.mri.hippocampalVolume / 4.2)) * 100).toFixed(0)}% atrophy index
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

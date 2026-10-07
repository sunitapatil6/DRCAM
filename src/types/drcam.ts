/**
 * Deep Reinforced Cognitive Analytics Algorithm (DRCAM) Types
 * Reference: S. Patil, Dr. S. Kukreja, MethodsX 14 (2025) 103277
 */

export type CognitiveImpairmentLevel = 'Normal' | 'Mild' | 'Moderate' | 'Severe';

export interface NeuroimagingData {
  hippocampalVolume: number; // cm³ (typical: 1.0 - 4.5 cm³)
  corticalThickness: number; // mm (typical: 1.5 - 3.5 mm)
  ventricularVolumeRatio: number; // ratio (0.1 - 0.8)
  sliceIndex: number; // 0 - 150 (3D tensor spatial resolution 256x256x150)
  atrophyPatternSeverity: number; // 0 - 1 normalized
}

export interface WearableSensorData {
  sleepDurationHours: number; // hours (e.g. 3.0 - 10.0 h)
  sleepFragmentationIndex: number; // 0 - 100%
  dailyStepCount: number; // steps/day (e.g. 500 - 15,000)
  restingHeartRate: number; // bpm (e.g. 50 - 110)
  heartRateVariability: number; // HRV SDNN in ms (e.g. 10 - 80 ms)
}

export interface CognitiveTestScores {
  mmseScore: number; // Mini-Mental State Exam: 0 - 30 scale
  mocaScore: number; // Montreal Cognitive Assessment: 0 - 30 scale
  cdrScore: number; // Clinical Dementia Rating: 0 (none), 0.5 (very mild), 1 (mild), 2 (moderate), 3 (severe)
  adasCogScore: number; // Alzheimer's Disease Assessment Scale-Cognitive: 0 - 70 scale
}

export interface SpeechTextData {
  sentimentPolarity: number; // -1.0 (highly negative/flat) to +1.0 (positive)
  verbalFluencyWordsPerMin: number; // words per min (e.g. 3 - 35)
  speechPauseFrequency: number; // hesitation pauses per minute (e.g. 1 - 25)
  phoneticAcousticScore: number; // MFCC acoustic stability (0 - 100)
}

export interface PatientProfile {
  id: string;
  name: string;
  age: number;
  gender: 'Female' | 'Male' | 'Other';
  educationYears: number;
  cohort: string;
  notes?: string;
}

export interface MultimodalPatientInput {
  patient: PatientProfile;
  mri: NeuroimagingData;
  wearables: WearableSensorData;
  tests: CognitiveTestScores;
  speech: SpeechTextData;
}

export interface MMTAttentionWeights {
  mri: number; // Percentage contribution (e.g. 35.4%)
  wearables: number; // Percentage contribution (e.g. 25.7%)
  tests: number; // Percentage contribution (e.g. 22.1%)
  speech: number; // Percentage contribution (e.g. 16.8%)
}

export interface CnnLstmOutput {
  mriContribution: number; // 38.6% in paper MCI case
  testsContribution: number; // 29.4%
  wearablesContribution: number; // 21.5%
  speechContribution: number; // 10.5%
  spatialFeatureNorm: number;
  temporalHiddenStateNorm: number;
}

export interface TcnTrajectoryPoint {
  month: number;
  predictedMMSE: number;
  actualBaselineReference?: number;
  withDQNIntervention: number;
  deviationPct: number;
}

export interface DqnActionRecommendation {
  phase: string;
  action: string;
  category: 'Cognitive' | 'Physical' | 'Verbal' | 'Multimodal';
  durationWeeks: number;
  expectedReward: number; // Δ MMSE improvement (e.g. +0.15, +0.20)
  targetDomain: string;
  intensity: 'Low' | 'Moderate' | 'High';
  clinicalRationale: string;
}

export interface DRCAMPredictionResult {
  predictedStage: CognitiveImpairmentLevel;
  stageProbabilities: {
    Normal: number;
    Mild: number;
    Moderate: number;
    Severe: number;
  };
  confidence: number; // e.g. 92.1%
  compositeImpairmentIndex: number; // 0.0 (perfect) to 1.0 (severe)
  mmtAttentionWeights: MMTAttentionWeights;
  cnnLstmOutput: CnnLstmOutput;
  tcnTrajectory: TcnTrajectoryPoint[];
  dqnInterventions: DqnActionRecommendation[];
  dqnTotalScoreImprovementPct: number; // e.g. 18.2%
  explainabilityPrecisionPct: number; // e.g. 92.5%
  gradCamMatrix: number[][]; // 10x10 matrix of brain activations
  dqnInfluenceHeatmap: number[][]; // 4x4 matrix from paper Fig 6
  keyBiomarkers: {
    hippocampalStatus: string;
    sleepIntegrity: string;
    cognitiveReserve: string;
    linguisticMarker: string;
  };
}

/**
 * Benchmark Tables and Experimental Results from MethodsX 14 (2025) 103277
 * Authors: Sunita Patil, Dr. Swetta Kukreja
 */

export const TABLE_1_MMT_OUTPUT = [
  {
    modality: 'MRI',
    attentionWeight: '35.4%',
    contribution: 'High',
    indicator: 'Hippocampal Vol 2.3 cm³',
    label: 'Mild Cognitive Impairment (MCI)',
  },
  {
    modality: 'Wearables (Sleep Duration)',
    attentionWeight: '25.7%',
    contribution: 'Moderate',
    indicator: '5.6 h sleep',
    label: 'Mild Cognitive Impairment (MCI)',
  },
  {
    modality: 'MMSE (Cognitive Test Score)',
    attentionWeight: '22.1%',
    contribution: 'Moderate',
    indicator: '26/30 MMSE',
    label: 'Mild Cognitive Impairment (MCI)',
  },
  {
    modality: 'Speech (Sentiment Polarity)',
    attentionWeight: '16.8%',
    contribution: 'Low',
    indicator: '-0.15 polarity',
    label: 'Mild Cognitive Impairment (MCI)',
  },
];

export const TABLE_2_CNN_LSTM_OUTPUT = [
  {
    feature: 'MRI',
    extractedPattern: 'Atrophic patterns',
    temporalTrend: 'Declining volume',
    finalContribution: '38.6%',
    label: 'Mild Cognitive Impairment (MCI)',
  },
  {
    feature: 'Test Scores (MMSE)',
    extractedPattern: 'Normal score clusters',
    temporalTrend: 'Gradual decline',
    finalContribution: '29.4%',
    label: 'Mild Cognitive Impairment (MCI)',
  },
  {
    feature: 'Wearables (Sleep)',
    extractedPattern: 'Fragmented sleep',
    temporalTrend: 'Irregular patterns',
    finalContribution: '21.5%',
    label: 'Mild Cognitive Impairment (MCI)',
  },
  {
    feature: 'Speech Features',
    extractedPattern: 'Reduced verbal fluency',
    temporalTrend: 'Consistent negativity',
    finalContribution: '10.5%',
    label: 'Mild Cognitive Impairment (MCI)',
  },
];

export const TABLE_3_DQN_OUTPUT = [
  {
    state: 'Baseline (MMSE: 26)',
    actionRecommended: 'Cognitive games',
    reward: '+0.15 (MMSE improvement)',
    durationWeeks: '4 weeks',
  },
  {
    state: 'Post-intervention 1',
    actionRecommended: 'Physical activity',
    reward: '+0.10',
    durationWeeks: '4 weeks',
  },
  {
    state: 'Post-intervention 2',
    actionRecommended: 'Verbal training',
    reward: '+0.12',
    durationWeeks: '6 weeks',
  },
  {
    state: 'Post-intervention 3',
    actionRecommended: 'Mixed regimen',
    reward: '+0.20',
    durationWeeks: '8 weeks',
  },
];

export const TABLE_4_TCN_OUTPUT = [
  { horizonMonths: 3, predictedMMSE: 25.7, actualMMSE: 26.0, deviationPct: 1.15 },
  { horizonMonths: 6, predictedMMSE: 25.1, actualMMSE: 25.3, deviationPct: 0.79 },
  { horizonMonths: 9, predictedMMSE: 24.5, actualMMSE: 24.7, deviationPct: 0.81 },
  { horizonMonths: 12, predictedMMSE: 23.9, actualMMSE: 24.0, deviationPct: 0.42 },
];

export const TABLE_5_FINAL_OUTPUTS = {
  cognitiveState: 'MCI',
  predictionConfidence: '92.1%',
  interventionImpact: '18.2%',
  explainabilityPrecision: '92.5%',
};

export const TABLE_6_COMPARISON = [
  {
    dataset: 'ADNI (MMSE)',
    proposedModel: '92.1%',
    blanco2023: '85.4%',
    chen2024: '88.7%',
    srinivasan2024: '86.2%',
    gainOverBestBaseline: '+3.4%',
  },
  {
    dataset: 'ADNI (CDR)',
    proposedModel: '91.5%',
    blanco2023: '83.9%',
    chen2024: '87.6%',
    srinivasan2024: '84.8%',
    gainOverBestBaseline: '+3.9%',
  },
  {
    dataset: 'DementiaBank',
    proposedModel: '90.4%',
    blanco2023: '81.3%',
    chen2024: '85.2%',
    srinivasan2024: '82.7%',
    gainOverBestBaseline: '+5.2%',
  },
];

export const PAPER_METRICS_HIGHLIGHTS = {
  cohortSize: '1,000 participants (65+ years)',
  mriResolution: '256 × 256 × 150 (3D tensor, 1mm³)',
  populationAccuracy: '91.8% (±1.6% variance)',
  tcnAverageError: '0.79% across 12-month trajectory',
  dqnImprovement: '18.2% cognitive gain (outperforming heuristics by +5.7%)',
  inferenceReduction: '32% inference latency reduction vs transformer-only',
};

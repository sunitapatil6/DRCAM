import { MultimodalPatientInput } from '../types/drcam';

export interface CaseStudyPreset {
  id: string;
  title: string;
  cohort: string;
  badge: string;
  description: string;
  data: MultimodalPatientInput;
}

export const CASE_STUDY_PRESETS: CaseStudyPreset[] = [
  {
    id: 'paper-validation-case',
    title: 'Paper Benchmark: Patient MCI-104 (Patil & Kukreja 2025)',
    cohort: 'ADNI-3 / MethodsX Validation',
    badge: 'Paper Validation Case (12-Mo Study)',
    description:
      'Exact 12-month clinical evaluation patient from Section "Method validation" (MMSE 26/30, Hippocampal volume 2.3 cm³, Sleep 5.6h, Sentiment -0.15).',
    data: {
      patient: {
        id: 'PT-ADNI-0922',
        name: 'Participant #104 (MethodsX Case)',
        age: 68,
        gender: 'Female',
        educationYears: 16,
        cohort: 'ADNI Longitudinal Subgroup',
        notes: 'Under observation for 12 months. Early complaint of short-term memory lapses and names recall.',
      },
      mri: {
        hippocampalVolume: 2.3, // cm³ (from Table 1 & text)
        corticalThickness: 2.35, // mm
        ventricularVolumeRatio: 0.38,
        sliceIndex: 78,
        atrophyPatternSeverity: 0.42,
      },
      wearables: {
        sleepDurationHours: 5.6, // hours (from Table 1)
        sleepFragmentationIndex: 38,
        dailyStepCount: 4250,
        restingHeartRate: 74,
        heartRateVariability: 32,
      },
      tests: {
        mmseScore: 26, // baseline from text & Table 1 & Table 3
        mocaScore: 24,
        cdrScore: 0.5, // questionable/very mild impairment
        adasCogScore: 16.5,
      },
      speech: {
        sentimentPolarity: -0.15, // from Table 1
        verbalFluencyWordsPerMin: 14,
        speechPauseFrequency: 11,
        phoneticAcousticScore: 68,
      },
    },
  },
  {
    id: 'normal-healthy-control',
    title: 'Healthy Aging Control (Normal Cognition)',
    cohort: 'ADNI Healthy Older Adults',
    badge: 'Normal Stage',
    description:
      'Community-dwelling senior with robust hippocampal volume, intact sleep architecture, and MMSE 29/30.',
    data: {
      patient: {
        id: 'PT-HC-0418',
        name: 'Eleanor Vance',
        age: 67,
        gender: 'Female',
        educationYears: 18,
        cohort: 'ADNI Normal Control (NL)',
        notes: 'No subjective memory complaints. Active in community lectures and tennis.',
      },
      mri: {
        hippocampalVolume: 3.75, // cm³ (nominal preserved)
        corticalThickness: 2.95, // mm
        ventricularVolumeRatio: 0.22,
        sliceIndex: 82,
        atrophyPatternSeverity: 0.08,
      },
      wearables: {
        sleepDurationHours: 7.4, // healthy sleep duration
        sleepFragmentationIndex: 16,
        dailyStepCount: 7800,
        restingHeartRate: 64,
        heartRateVariability: 52,
      },
      tests: {
        mmseScore: 29,
        mocaScore: 28,
        cdrScore: 0.0,
        adasCogScore: 6.2,
      },
      speech: {
        sentimentPolarity: 0.45,
        verbalFluencyWordsPerMin: 24,
        speechPauseFrequency: 4,
        phoneticAcousticScore: 89,
      },
    },
  },
  {
    id: 'moderate-cognitive-decline',
    title: 'Moderate Cognitive Impairment (Progressive)',
    cohort: 'ADNI Clinical Cohort',
    badge: 'Moderate Stage',
    description:
      'Patient displaying pronounced bilateral hippocampal volume loss (1.75 cm³), fragmented sleep, and MMSE 18/30.',
    data: {
      patient: {
        id: 'PT-ADNI-1284',
        name: 'Robert Hastings',
        age: 74,
        gender: 'Male',
        educationYears: 14,
        cohort: 'ADNI Moderate Decline Cohort',
        notes: 'Requires assistance with financial instruments and medication schedules. Pronounced disorientation.',
      },
      mri: {
        hippocampalVolume: 1.75, // cm³
        corticalThickness: 1.95, // mm
        ventricularVolumeRatio: 0.58,
        sliceIndex: 72,
        atrophyPatternSeverity: 0.68,
      },
      wearables: {
        sleepDurationHours: 4.4,
        sleepFragmentationIndex: 58,
        dailyStepCount: 2600,
        restingHeartRate: 82,
        heartRateVariability: 21,
      },
      tests: {
        mmseScore: 18,
        mocaScore: 16,
        cdrScore: 1.0,
        adasCogScore: 31.0,
      },
      speech: {
        sentimentPolarity: -0.38,
        verbalFluencyWordsPerMin: 9,
        speechPauseFrequency: 16,
        phoneticAcousticScore: 48,
      },
    },
  },
  {
    id: 'severe-cognitive-impairment',
    title: 'Severe Cognitive Impairment (Late Stage)',
    cohort: 'ADNI Late AD Registry',
    badge: 'Severe Stage',
    description:
      'Advanced neurodegenerative involvement with severe cortical thinning, marked ventricular enlargement, and MMSE 10/30.',
    data: {
      patient: {
        id: 'PT-ADNI-2051',
        name: 'Grace Montgomery',
        age: 82,
        gender: 'Female',
        educationYears: 12,
        cohort: 'ADNI Late Stage Cohort',
        notes: 'Extensive dependency in activities of daily living (ADLs). Severe anomia and episodic memory loss.',
      },
      mri: {
        hippocampalVolume: 1.15, // cm³
        corticalThickness: 1.62, // mm
        ventricularVolumeRatio: 0.76,
        sliceIndex: 65,
        atrophyPatternSeverity: 0.91,
      },
      wearables: {
        sleepDurationHours: 3.8,
        sleepFragmentationIndex: 74,
        dailyStepCount: 1100,
        restingHeartRate: 88,
        heartRateVariability: 14,
      },
      tests: {
        mmseScore: 10,
        mocaScore: 8,
        cdrScore: 2.0,
        adasCogScore: 49.5,
      },
      speech: {
        sentimentPolarity: -0.62,
        verbalFluencyWordsPerMin: 4,
        speechPauseFrequency: 22,
        phoneticAcousticScore: 32,
      },
    },
  },
];

import React, { useState } from 'react';
import { MessageSquare, Mic, Sparkles, Volume2, CheckCircle2 } from 'lucide-react';
import { SpeechTextData } from '../types/drcam';

interface Props {
  speechData: SpeechTextData;
  onChange: (updated: Partial<SpeechTextData>) => void;
}

export const SpeechAnalysisCard: React.FC<Props> = ({ speechData, onChange }) => {
  const [sampleText, setSampleText] = useState(
    "Well, the mother is wiping the dishes, but the water is overflowing from the sink. The boy is reaching up into the cookie jar on the stool, and he seems to be tipping over."
  );

  const sampleCookieTheftTranscripts = [
    {
      title: 'Healthy Senior (Normal Fluent)',
      text: 'In the kitchen, the woman is drying dishes while water overflows onto the floor. Behind her, a young boy stands precariously on a wobbly stool trying to steal cookies from the upper jar, while his sister reaches up.',
      sentiment: 0.25,
      fluency: 26,
      pauses: 3,
    },
    {
      title: 'MCI Patient (Paper Validation Case)',
      text: 'Well, she is washing... drying dishes, but the sink is running over. And the boy is... up on a stool getting cookies from the jar, and it looks like he is going to fall down.',
      sentiment: -0.15,
      fluency: 14,
      pauses: 11,
    },
    {
      title: 'Moderate Impairment (DementiaBank #042)',
      text: 'The water... spilling everywhere. She is standing there. And the children... one is climbing up for... something sweet. The stool is slipping.',
      sentiment: -0.38,
      fluency: 8,
      pauses: 17,
    },
    {
      title: 'Severe Impairment (Late Stage)',
      text: 'Water... there... the lady... girl and boy... fall... uh...',
      sentiment: -0.62,
      fluency: 4,
      pauses: 24,
    },
  ];

  const handleApplySample = (s: typeof sampleCookieTheftTranscripts[0]) => {
    setSampleText(s.text);
    onChange({
      sentimentPolarity: s.sentiment,
      verbalFluencyWordsPerMin: s.fluency,
      speechPauseFrequency: s.pauses,
    });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-purple-400" />
          <div>
            <h3 className="text-sm font-semibold text-slate-100">
              Conversational Speech & Linguistic Analysis (DementiaBank)
            </h3>
            <p className="text-xs text-slate-400">
              Acoustic MFCCs · Sentiment Polarity · Boston Cookie Theft Elicitation Test
            </p>
          </div>
        </div>

        <span className="text-[11px] font-mono text-purple-400 bg-purple-950/40 border border-purple-800/60 rounded px-2.5 py-1">
          BERT Embeddings + MFCC Feature Stream
        </span>
      </div>

      {/* Preset Cookie Theft Transcripts */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-mono text-slate-400 uppercase">
          Standardized Verbal Elicitation Samples
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {sampleCookieTheftTranscripts.map((s, idx) => (
            <button
              key={idx}
              onClick={() => handleApplySample(s)}
              className="p-2 rounded-lg bg-slate-950/60 border border-slate-800 hover:border-slate-700 text-left transition-all"
            >
              <div className="text-xs font-semibold text-purple-300">{s.title}</div>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                {s.fluency} wpm · {s.pauses} pauses · {s.sentiment} pol
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Text area for transcript inspection */}
      <div className="space-y-1.5">
        <label className="text-xs text-slate-300 font-medium block">
          Clinical Discourse Transcript:
        </label>
        <textarea
          rows={3}
          value={sampleText}
          onChange={(e) => setSampleText(e.target.value)}
          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500 font-sans"
        />
      </div>

      {/* Acoustic & Linguistic Parameters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-400">Sentiment Polarity</span>
            <span className="font-mono font-bold text-purple-400">
              {speechData.sentimentPolarity.toFixed(2)}
            </span>
          </div>
          <input
            type="range"
            min="-1.0"
            max="1.0"
            step="0.05"
            value={speechData.sentimentPolarity}
            onChange={(e) => onChange({ sentimentPolarity: parseFloat(e.target.value) })}
            className="w-full accent-purple-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
          />
          <span className="text-[10px] text-slate-500 font-mono mt-1 block">
            Paper MCI Value: -0.15
          </span>
        </div>

        <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-400">Verbal Fluency (Words/min)</span>
            <span className="font-mono font-bold text-purple-400">
              {speechData.verbalFluencyWordsPerMin} wpm
            </span>
          </div>
          <input
            type="range"
            min="3"
            max="32"
            step="1"
            value={speechData.verbalFluencyWordsPerMin}
            onChange={(e) => onChange({ verbalFluencyWordsPerMin: parseInt(e.target.value) })}
            className="w-full accent-purple-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
          />
          <span className="text-[10px] text-slate-500 font-mono mt-1 block">
            Normal: ≥20 · Impaired: &lt;14
          </span>
        </div>

        <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-400">Hesitation Pauses/min</span>
            <span className="font-mono font-bold text-purple-400">
              {speechData.speechPauseFrequency} pauses
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="30"
            step="1"
            value={speechData.speechPauseFrequency}
            onChange={(e) => onChange({ speechPauseFrequency: parseInt(e.target.value) })}
            className="w-full accent-purple-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
          />
          <span className="text-[10px] text-slate-500 font-mono mt-1 block">
            Linguistic hesitation indicator
          </span>
        </div>
      </div>
    </div>
  );
};

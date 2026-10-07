import React, { useState } from 'react';
import { Layers, Eye, EyeOff, Info, ZoomIn, Activity, Brain } from 'lucide-react';
import { NeuroimagingData } from '../types/drcam';

interface Props {
  mriData: NeuroimagingData;
  onChange: (updated: Partial<NeuroimagingData>) => void;
  predictedStage: string;
}

export const MriGradCamViewer: React.FC<Props> = ({ mriData, onChange, predictedStage }) => {
  const [showGradCam, setShowGradCam] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState<string | null>('hippocampus');

  // Key brain slices
  const slice = mriData.sliceIndex;
  const hipVol = mriData.hippocampalVolume;
  const cortThick = mriData.corticalThickness;
  const ventRatio = mriData.ventricularVolumeRatio;

  // Derive visual scaling factors based on actual metrics
  const ventricleScale = Math.max(0.7, Math.min(2.0, ventRatio * 2.2));
  const hippocampusScale = Math.max(0.5, Math.min(1.4, hipVol / 2.8));
  const atrophyIntensity = Math.max(0, Math.min(1, (3.5 - hipVol) / 2.5));

  const regions: Record<string, { name: string; attribution: string; status: string; clinical: string }> = {
    hippocampus: {
      name: 'Medial Temporal Lobe / Hippocampus',
      attribution: `${(35.4 + atrophyIntensity * 6).toFixed(1)}% Grad-CAM Attribution`,
      status: hipVol >= 3.0 ? 'Preserved Volume' : hipVol >= 2.0 ? 'Mild Atrophy (MCI Marker)' : 'Severe Neuronal Loss',
      clinical: `Volume measured at ${hipVol.toFixed(2)} cm³ (Standard normative: 3.2 - 4.5 cm³). Primary biomarker for early consolidation memory impairment.`,
    },
    ventricles: {
      name: 'Lateral Ventricles & Third Ventricle',
      attribution: `${(18.2 + ventRatio * 8).toFixed(1)}% Structural Expansion`,
      status: ventRatio <= 0.3 ? 'Nominal Ventricular Volume' : 'Compensatory Ventriculomegaly',
      clinical: `Expansion ratio: ${(ventRatio * 100).toFixed(0)}%. Secondary index of ex vacuo cerebral volume loss.`,
    },
    cortex: {
      name: 'Entorhinal & Temporal Neocortex',
      attribution: `${(24.5 + (3.0 - cortThick) * 10).toFixed(1)}% Spatial Weight`,
      status: cortThick >= 2.8 ? 'Intact Cortical Ribbon' : 'Cortical Thinning Noted',
      clinical: `Mean cortical thickness ${cortThick.toFixed(2)} mm. Pipeline FreeSurfer v7.3 automated segmentation.`,
    },
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
      {/* Header controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-cyan-400" />
          <div>
            <h3 className="text-sm font-semibold text-slate-100">
              Structural MRI & Grad-CAM Spatial Activation
            </h3>
            <p className="text-xs text-slate-400">
              T1-weighted 3D Tensor (256×256×150) · 1mm³ Voxel Resolution
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowGradCam(!showGradCam)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              showGradCam
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700'
            }`}
          >
            {showGradCam ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>Grad-CAM Heatmap: {showGradCam ? 'ON' : 'OFF'}</span>
          </button>
        </div>
      </div>

      {/* Main Viewport & Anatomical Cross Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Visual Brain Stage */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="relative w-full max-w-[340px] aspect-square bg-slate-950 rounded-xl border border-slate-800 p-3 flex items-center justify-center overflow-hidden shadow-inner">
            {/* Axial Slice SVG Simulation */}
            <svg
              viewBox="0 0 300 300"
              className="w-full h-full select-none"
              style={{ filter: 'drop-shadow(0 0 12px rgba(0,0,0,0.8))' }}
            >
              <defs>
                {/* Radial gradient for skull & white matter */}
                <radialGradient id="brainBg" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="70%" stopColor="#0f172a" />
                  <stop offset="95%" stopColor="#020617" />
                </radialGradient>
                {/* Grad-CAM Warm Gradient for Hippocampus */}
                <radialGradient id="gradcamWarm" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(239, 68, 68, 0.85)" />
                  <stop offset="45%" stopColor="rgba(249, 115, 22, 0.70)" />
                  <stop offset="75%" stopColor="rgba(234, 179, 8, 0.45)" />
                  <stop offset="100%" stopColor="rgba(6, 182, 212, 0.0)" />
                </radialGradient>
                {/* Grad-CAM Secondary Cortical Gradient */}
                <radialGradient id="gradcamCortical" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(244, 63, 94, 0.75)" />
                  <stop offset="60%" stopColor="rgba(245, 158, 11, 0.4)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>

              {/* Cranial Skull Contour */}
              <ellipse
                cx="150"
                cy="150"
                rx="124"
                ry="134"
                fill="#0f172a"
                stroke="#334155"
                strokeWidth="3.5"
              />
              {/* Outer Cranial Bone Layer */}
              <ellipse
                cx="150"
                cy="150"
                rx="128"
                ry="138"
                fill="none"
                stroke="#475569"
                strokeWidth="1.5"
                strokeDasharray="4 2"
              />

              {/* Outer Cortical Boundary with Sulcal Grooves */}
              <path
                d={`M 150,22 
                   C 185,22 215,40 236,75 
                   C 255,108 258,150 252,190 
                   C 246,230 215,268 180,274 
                   C 160,277 150,268 150,268 
                   C 150,268 140,277 120,274 
                   C 85,268 54,230 48,190 
                   C 42,150 45,108 64,75 
                   C 85,40 115,22 150,22 Z`}
                fill="#1e293b"
                stroke="#64748b"
                strokeWidth={Math.max(1.8, cortThick * 0.9)}
                className="cursor-pointer hover:stroke-cyan-400 transition-colors"
                onClick={() => setSelectedRegion('cortex')}
              />

              {/* Interhemispheric Fissure (Longitudinal) */}
              <line
                x1="150"
                y1="30"
                x2="150"
                y2="265"
                stroke="#090d16"
                strokeWidth="2.5"
              />

              {/* Deep White Matter Architecture */}
              <ellipse cx="108" cy="145" rx="36" ry="60" fill="#334155" opacity="0.65" />
              <ellipse cx="192" cy="145" rx="36" ry="60" fill="#334155" opacity="0.65" />

              {/* Lateral Ventricles (CSF - Black, Enlarges with Atrophy) */}
              <g
                className="cursor-pointer transition-transform duration-300"
                onClick={() => setSelectedRegion('ventricles')}
              >
                {/* Left Lateral Ventricle */}
                <path
                  d={`M 144,115 C 130,${120 - ventricleScale * 5} 122,${145 + ventricleScale * 8} 136,175 C 142,165 145,140 144,115 Z`}
                  fill="#030712"
                  stroke="#475569"
                  strokeWidth="1.2"
                />
                {/* Right Lateral Ventricle */}
                <path
                  d={`M 156,115 C 170,${120 - ventricleScale * 5} 178,${145 + ventricleScale * 8} 164,175 C 158,165 155,140 156,115 Z`}
                  fill="#030712"
                  stroke="#475569"
                  strokeWidth="1.2"
                />
              </g>

              {/* Hippocampal Formations (Medial Temporal Lobes) */}
              <g
                className="cursor-pointer"
                onClick={() => setSelectedRegion('hippocampus')}
              >
                {/* Left Hippocampus */}
                <ellipse
                  cx="115"
                  cy="176"
                  rx={16 * hippocampusScale}
                  ry={22 * hippocampusScale}
                  fill="#475569"
                  stroke="#94a3b8"
                  strokeWidth="1.2"
                  className="transition-all duration-300 hover:fill-cyan-600"
                />
                {/* Right Hippocampus */}
                <ellipse
                  cx="185"
                  cy="176"
                  rx={16 * hippocampusScale}
                  ry={22 * hippocampusScale}
                  fill="#475569"
                  stroke="#94a3b8"
                  strokeWidth="1.2"
                  className="transition-all duration-300 hover:fill-cyan-600"
                />
              </g>

              {/* GRAD-CAM ACTIVATION OVERLAY (from Paper Fig. 6) */}
              {showGradCam && (
                <g className="transition-opacity duration-300 pointer-events-none">
                  {/* Left Hippocampus Heatmap Focus */}
                  <circle
                    cx="115"
                    cy="176"
                    r={32 + atrophyIntensity * 12}
                    fill="url(#gradcamWarm)"
                    opacity="0.88"
                  />
                  {/* Right Hippocampus Heatmap Focus */}
                  <circle
                    cx="185"
                    cy="176"
                    r={32 + atrophyIntensity * 12}
                    fill="url(#gradcamWarm)"
                    opacity="0.88"
                  />
                  {/* Entorhinal Temporal Cortical Hotspots */}
                  <ellipse
                    cx="68"
                    cy="180"
                    rx="24"
                    ry="34"
                    fill="url(#gradcamCortical)"
                    opacity={0.4 + atrophyIntensity * 0.4}
                  />
                  <ellipse
                    cx="232"
                    cy="180"
                    rx="24"
                    ry="34"
                    fill="url(#gradcamCortical)"
                    opacity={0.4 + atrophyIntensity * 0.4}
                  />
                </g>
              )}

              {/* Region highlight rings */}
              {selectedRegion === 'hippocampus' && (
                <>
                  <circle
                    cx="115"
                    cy="176"
                    r="24"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="1.8"
                    strokeDasharray="3 3"
                  />
                  <circle
                    cx="185"
                    cy="176"
                    r="24"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="1.8"
                    strokeDasharray="3 3"
                  />
                </>
              )}
              {selectedRegion === 'ventricles' && (
                <ellipse
                  cx="150"
                  cy="145"
                  rx="30"
                  ry="40"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="1.8"
                  strokeDasharray="3 3"
                />
              )}
              {selectedRegion === 'cortex' && (
                <ellipse
                  cx="150"
                  cy="150"
                  rx="118"
                  ry="128"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="1.8"
                  strokeDasharray="4 4"
                />
              )}

              {/* Coordinate Reticle & Labels */}
              <text x="150" y="16" fill="#94a3b8" fontSize="10" textAnchor="middle" fontFamily="monospace">
                ANTERIOR (A)
              </text>
              <text x="150" y="294" fill="#94a3b8" fontSize="10" textAnchor="middle" fontFamily="monospace">
                POSTERIOR (P)
              </text>
              <text x="10" y="153" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                R
              </text>
              <text x="282" y="153" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                L
              </text>
            </svg>

            {/* Quick slice badge */}
            <div className="absolute top-2 left-2 text-[11px] font-mono bg-slate-900/90 border border-slate-700/60 rounded px-2 py-0.5 text-slate-300">
              Axial Slice: #{slice} / 150
            </div>
            {/* Attribution badge */}
            <div className="absolute bottom-2 right-2 text-[11px] font-mono bg-slate-900/90 border border-slate-700/60 rounded px-2 py-0.5 text-cyan-300">
              CNN Spatial Weight: 38.6%
            </div>
          </div>

          {/* Slice Scrubber */}
          <div className="w-full max-w-[340px] mt-3 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Z-Axis Axial Slice Depth</span>
              <span className="text-cyan-400 font-semibold">{slice} / 150</span>
            </div>
            <input
              type="range"
              min="10"
              max="140"
              value={slice}
              onChange={(e) => onChange({ sliceIndex: parseInt(e.target.value) })}
              className="w-full accent-cyan-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>Inferior Cerebellum (10)</span>
              <span>Hippocampus Level (78)</span>
              <span>Superior Cortex (140)</span>
            </div>
          </div>
        </div>

        {/* Region Clinical Inspector & Color Scale */}
        <div className="lg:col-span-5 space-y-3">
          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-mono">
              Interactive Anatomic Probe
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              {(['hippocampus', 'ventricles', 'cortex'] as const).map((reg) => (
                <button
                  key={reg}
                  onClick={() => setSelectedRegion(reg)}
                  className={`text-xs py-1.5 px-2 rounded-lg font-medium transition-colors capitalize ${
                    selectedRegion === reg
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm'
                      : 'bg-slate-800/70 text-slate-400 hover:text-slate-200 border border-slate-700/60'
                  }`}
                >
                  {reg === 'hippocampus' ? 'Hippocampus' : reg === 'ventricles' ? 'Ventricles' : 'Cortex'}
                </button>
              ))}
            </div>
          </div>

          {/* Region details card */}
          {selectedRegion && regions[selectedRegion] && (
            <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-slate-200">
                  {regions[selectedRegion].name}
                </h4>
                <span className="text-[11px] font-mono font-medium text-amber-400">
                  {regions[selectedRegion].attribution}
                </span>
              </div>
              <div className="text-xs text-slate-300 font-medium">
                {regions[selectedRegion].status}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {regions[selectedRegion].clinical}
              </p>
            </div>
          )}

          {/* Biomarker sliders */}
          <div className="bg-slate-950/50 border border-slate-800/80 rounded-lg p-3 space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Hippocampal Volume (cm³)</span>
                <span className="font-mono text-cyan-400 font-semibold">{hipVol.toFixed(2)} cm³</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="4.2"
                step="0.05"
                value={hipVol}
                onChange={(e) => onChange({ hippocampalVolume: parseFloat(e.target.value) })}
                className="w-full accent-cyan-500 cursor-pointer h-1 bg-slate-800 rounded"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>Severe Atrophy (1.0)</span>
                <span>Paper MCI (2.3)</span>
                <span>Normal (≥3.2)</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Mean Cortical Thickness (mm)</span>
                <span className="font-mono text-cyan-400 font-semibold">{cortThick.toFixed(2)} mm</span>
              </div>
              <input
                type="range"
                min="1.5"
                max="3.4"
                step="0.05"
                value={cortThick}
                onChange={(e) => onChange({ corticalThickness: parseFloat(e.target.value) })}
                className="w-full accent-cyan-500 cursor-pointer h-1 bg-slate-800 rounded"
              />
            </div>
          </div>

          {/* Grad-CAM Color Legend (from Fig. 6 in paper) */}
          <div className="pt-1 border-t border-slate-800/60">
            <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
              <span>Grad-CAM Activation Scale</span>
              <span className="font-mono text-[10px]">High Impact → Low Impact</span>
            </div>
            <div className="h-2 w-full rounded-full bg-gradient-to-r from-red-600 via-amber-500 via-cyan-500 to-slate-800" />
            <div className="flex justify-between text-[9px] text-slate-500 font-mono mt-0.5">
              <span>Max (Hippocampus Atrophy)</span>
              <span>Intermediate</span>
              <span>Baseline (0.0)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { TrendingDown, Activity, Clock, ShieldCheck, Zap } from 'lucide-react';
import { TcnTrajectoryPoint } from '../types/drcam';

interface Props {
  baselineMMSE: number;
  trajectory: TcnTrajectoryPoint[];
  predictedStage: string;
}

export const TcnTrajectoryForecast: React.FC<Props> = ({
  baselineMMSE,
  trajectory,
  predictedStage,
}) => {
  const [activeHorizon, setActiveHorizon] = useState<number>(12);

  // SVG chart sizing
  const width = 600;
  const height = 220;
  const padding = { top: 25, right: 35, bottom: 35, left: 45 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  // X range: 0 to 12 months
  // Y range: min (e.g. 5 or baseline - 8) to max (e.g. 30)
  const minY = Math.max(0, Math.min(...trajectory.map((p) => p.predictedMMSE)) - 2);
  const maxY = 30;

  const getX = (month: number) => padding.left + (month / 12) * chartW;
  const getY = (val: number) =>
    padding.top + chartH - ((val - minY) / (maxY - minY)) * chartH;

  // Build points including baseline month 0
  const pointsDecline = [{ month: 0, val: baselineMMSE }, ...trajectory.map((t) => ({ month: t.month, val: t.predictedMMSE }))];
  const pointsDQN = [{ month: 0, val: baselineMMSE }, ...trajectory.map((t) => ({ month: t.month, val: t.withDQNIntervention }))];

  const pathDecline = pointsDecline
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(p.month)},${getY(p.val)}`)
    .join(' ');

  const pathDQN = pointsDQN
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(p.month)},${getY(p.val)}`)
    .join(' ');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-cyan-400" />
          <div>
            <h3 className="text-sm font-semibold text-slate-100">
              TCN 12-Month Longitudinal Cognitive Trajectory Forecasting
            </h3>
            <p className="text-xs text-slate-400">
              Dilated 1D Convolutions with Residual Connections (Eq. 28-31) · Deviation &lt; 1%
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="w-3 h-0.5 bg-rose-400 inline-block" />
            <span>Unmitigated Trajectory</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-3 h-0.5 bg-emerald-400 inline-block" />
            <span>+ DQN Personalized Interventions</span>
          </div>
        </div>
      </div>

      {/* Trajectory SVG Graph */}
      <div className="w-full overflow-x-auto bg-slate-950/70 border border-slate-800/80 rounded-lg p-3">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full select-none font-mono">
          {/* Grid lines */}
          {[10, 15, 20, 25, 30].map((tick) => {
            if (tick < minY || tick > maxY) return null;
            const y = getY(tick);
            return (
              <g key={tick}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="#1e293b"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <text
                  x={padding.left - 8}
                  y={y + 3}
                  fill="#64748b"
                  fontSize="9"
                  textAnchor="end"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          {/* X axis milestones */}
          {[0, 3, 6, 9, 12].map((m) => {
            const x = getX(m);
            return (
              <g key={m}>
                <line
                  x1={x}
                  y1={padding.top}
                  x2={x}
                  y2={height - padding.bottom}
                  stroke="#1e293b"
                  strokeWidth="1"
                />
                <text
                  x={x}
                  y={height - padding.bottom + 16}
                  fill="#94a3b8"
                  fontSize="10"
                  textAnchor="middle"
                >
                  {m === 0 ? 'Baseline' : `M+${m}`}
                </text>
              </g>
            );
          })}

          {/* Shaded Area between DQN trajectory and unmitigated decline */}
          <path
            d={`${pathDQN} ${pointsDecline
              .slice()
              .reverse()
              .map((p) => `L ${getX(p.month)},${getY(p.val)}`)
              .join(' ')} Z`}
            fill="rgba(16, 185, 129, 0.12)"
          />

          {/* Curves */}
          <path
            d={pathDecline}
            fill="none"
            stroke="#f43f5e"
            strokeWidth="2.5"
            strokeDasharray="5 3"
          />
          <path
            d={pathDQN}
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
          />

          {/* Data Points on Decline */}
          {pointsDecline.map((p) => (
            <circle
              key={`dec-${p.month}`}
              cx={getX(p.month)}
              cy={getY(p.val)}
              r="3.5"
              fill="#f43f5e"
              stroke="#0f172a"
              strokeWidth="1.5"
            />
          ))}

          {/* Data Points on DQN */}
          {pointsDQN.map((p) => (
            <g key={`dqn-${p.month}`}>
              <circle
                cx={getX(p.month)}
                cy={getY(p.val)}
                r="4"
                fill="#10b981"
                stroke="#0f172a"
                strokeWidth="1.5"
              />
              <text
                x={getX(p.month)}
                y={getY(p.val) - 8}
                fill="#10b981"
                fontSize="9"
                fontWeight="bold"
                textAnchor="middle"
              >
                {p.val.toFixed(1)}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Trajectory Numerical Table (reproducing Table 4 from paper) */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
              <th className="py-2 px-3">Horizon</th>
              <th className="py-2 px-3">Forecasted MMSE</th>
              <th className="py-2 px-3 text-emerald-400">With DQN Regimen</th>
              <th className="py-2 px-3">TCN Deviation (%)</th>
              <th className="py-2 px-3">Clinical Action Window</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            {trajectory.map((item) => (
              <tr
                key={item.month}
                className={`hover:bg-slate-800/40 transition-colors ${
                  activeHorizon === item.month ? 'bg-cyan-950/20' : ''
                }`}
                onClick={() => setActiveHorizon(item.month)}
              >
                <td className="py-2.5 px-3 font-semibold text-slate-200">
                  {item.month} Months
                </td>
                <td className="py-2.5 px-3 text-slate-300">
                  {item.predictedMMSE.toFixed(1)} / 30
                </td>
                <td className="py-2.5 px-3 font-bold text-emerald-400">
                  {item.withDQNIntervention.toFixed(1)} / 30 (+{(item.withDQNIntervention - item.predictedMMSE).toFixed(1)} pts)
                </td>
                <td className="py-2.5 px-3 text-cyan-400">
                  {item.deviationPct.toFixed(2)}%
                </td>
                <td className="py-2.5 px-3 text-slate-400 font-sans">
                  {item.month === 3 && 'Early executive training consolidation'}
                  {item.month === 6 && 'Physical-aerobic BDNF reinforcement'}
                  {item.month === 9 && 'Verbal scaffolding & fluency drills'}
                  {item.month === 12 && 'Long-term functional preservation check'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

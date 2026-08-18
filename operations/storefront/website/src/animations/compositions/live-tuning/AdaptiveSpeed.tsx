import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { CalibrationVar, getZoneColor } from "../../components/CalibrationVar";
import { colors } from "../../brand";

/**
 * Diagram: Live print view with real-time speed adjustments.
 * Shows a toolhead printing different features (overhang, bridge, infill)
 * with speed adapting based on sensor feedback.
 * Slider controls how aggressive the adaptive system is:
 *   0.0 = no adaptation — fixed speed everywhere, quality suffers
 *   0.5 = smart adaptation — speed varies per feature based on feedback
 *   1.0 = over-reactive — constant speed changes, jittery
 */
const AdaptiveSpeedDiagram: React.FC<{ value: number }> = ({ value }) => {
  const frame = useCurrentFrame();
  const zoneColor = getZoneColor(value);

  // How much the system adapts speed
  const adaptiveness = interpolate(value, [0, 0.5, 1], [0, 1, 2]);

  // Simulated print progress
  const printProgress = interpolate(frame, [30, 210], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Print path segments with different move types
  const segments = [
    { type: "Infill", optimalSpeed: 250, x1: 80, x2: 200, y: 200, color: colors.muted },
    { type: "Inner perim.", optimalSpeed: 150, x1: 200, x2: 300, y: 200, color: colors.lightBlue },
    { type: "Overhang", optimalSpeed: 40, x1: 300, x2: 400, y: 200, color: colors.accentAmber },
    { type: "Bridge", optimalSpeed: 120, x1: 400, x2: 500, y: 200, color: colors.skyBlue },
    { type: "Outer perim.", optimalSpeed: 80, x1: 500, x2: 620, y: 200, color: colors.primaryBlue },
  ];

  const fixedSpeed = 150; // speed without adaptation

  // Speed graph over time
  const graphY = 280;
  const graphHeight = 120;
  const graphWidth = 540;
  const graphX = 80;

  return (
    <svg width="700" height="580" viewBox="0 0 700 580">
      {/* Title */}
      <g transform="translate(350, 25)">
        <text x="0" y="0" textAnchor="middle" fill={colors.muted} fontSize="14" fontFamily="Space Grotesk">
          ADAPTIVE SPEED
        </text>
        <text x="0" y="28" textAnchor="middle" fill={zoneColor} fontSize="28" fontWeight="bold" fontFamily="Space Grotesk">
          {value < 0.3 ? "OFF — Fixed speed" : value > 0.7 ? "Over-reactive" : "Smart adaptation"}
        </text>
      </g>

      {/* Print path with segments */}
      <g>
        <text x="350" y="80" textAnchor="middle" fill={colors.muted} fontSize="14" fontFamily="Space Grotesk">
          Current print layer — move types
        </text>

        {segments.map((seg, i) => {
          const segProgress = interpolate(printProgress, [i / segments.length, (i + 1) / segments.length], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const isActive = segProgress > 0 && segProgress < 1;

          // Actual speed for this segment
          const actualSpeed = adaptiveness === 0
            ? fixedSpeed
            : interpolate(adaptiveness, [0, 1, 2], [fixedSpeed, seg.optimalSpeed, seg.optimalSpeed + (Math.sin(frame * 0.2 + i) * 40)]);

          // Quality indicator — how far from optimal
          const qualityDiff = Math.abs(actualSpeed - seg.optimalSpeed) / seg.optimalSpeed;
          const qualityColor = qualityDiff < 0.15 ? colors.correct : qualityDiff < 0.4 ? colors.accentAmber : colors.tooLow;

          return (
            <g key={i}>
              {/* Segment line */}
              <line
                x1={seg.x1} y1={seg.y}
                x2={seg.x1 + (seg.x2 - seg.x1) * segProgress} y2={seg.y}
                stroke={qualityColor}
                strokeWidth={isActive ? 5 : 3}
                strokeLinecap="round"
              />
              {/* Remaining (faded) */}
              <line
                x1={seg.x1 + (seg.x2 - seg.x1) * segProgress} y1={seg.y}
                x2={seg.x2} y2={seg.y}
                stroke={colors.muted + "22"}
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Move type label */}
              <text
                x={(seg.x1 + seg.x2) / 2}
                y={seg.y - 15}
                textAnchor="middle"
                fill={isActive ? colors.text : colors.muted + "66"}
                fontSize="12"
                fontWeight={isActive ? "bold" : "normal"}
                fontFamily="Space Grotesk"
              >
                {seg.type}
              </text>

              {/* Speed label below */}
              <text
                x={(seg.x1 + seg.x2) / 2}
                y={seg.y + 25}
                textAnchor="middle"
                fill={isActive ? qualityColor : colors.muted + "44"}
                fontSize="11"
                fontFamily="Space Grotesk"
              >
                {isActive ? `${actualSpeed.toFixed(0)} mm/s` : `opt: ${seg.optimalSpeed}`}
              </text>
            </g>
          );
        })}

        {/* Toolhead marker */}
        {(() => {
          const totalWidth = 540;
          const toolX = 80 + printProgress * totalWidth;
          return (
            <g>
              <polygon points={`${toolX - 6},${185} ${toolX + 6},${185} ${toolX},${196}`} fill={colors.white} />
              <rect x={toolX - 15} y="170" width="30" height="15" rx="3" fill={zoneColor} />
            </g>
          );
        })()}
      </g>

      {/* Speed over time graph */}
      <g>
        <text x={graphX + graphWidth / 2} y={graphY - 10} textAnchor="middle" fill={colors.muted} fontSize="14" fontFamily="Space Grotesk">
          Speed over time
        </text>

        <rect x={graphX} y={graphY} width={graphWidth} height={graphHeight} rx="6" fill={colors.deepBlue + "88"} />

        {/* Optimal speed line (stepped) */}
        {segments.map((seg, i) => {
          const x1 = graphX + (seg.x1 - 80) / 540 * graphWidth;
          const x2 = graphX + (seg.x2 - 80) / 540 * graphWidth;
          const y = graphY + graphHeight - (seg.optimalSpeed / 300) * graphHeight;
          return (
            <line key={i} x1={x1} y1={y} x2={x2} y2={y} stroke={colors.correct + "44"} strokeWidth="2" strokeDasharray="4,4" />
          );
        })}

        {/* Actual speed line */}
        {(() => {
          const points: string[] = [];
          for (let i = 0; i <= graphWidth; i += 3) {
            const t = i / graphWidth;
            const segIdx = Math.min(Math.floor(t * segments.length), segments.length - 1);
            const seg = segments[segIdx];

            let speed;
            if (adaptiveness === 0) {
              speed = fixedSpeed;
            } else if (adaptiveness <= 1) {
              speed = interpolate(adaptiveness, [0, 1], [fixedSpeed, seg.optimalSpeed]);
            } else {
              // Over-reactive: jittery around optimal
              const jitter = Math.sin(i * 0.3) * 30 * (adaptiveness - 1);
              speed = seg.optimalSpeed + jitter;
            }

            const x = graphX + i;
            const y = graphY + graphHeight - (speed / 300) * graphHeight;
            points.push(`${x},${y}`);
          }
          return (
            <polyline points={points.join(" ")} fill="none" stroke={zoneColor} strokeWidth="2.5" strokeLinejoin="round" />
          );
        })()}

        {/* Progress marker */}
        <line
          x1={graphX + printProgress * graphWidth}
          y1={graphY}
          x2={graphX + printProgress * graphWidth}
          y2={graphY + graphHeight}
          stroke={colors.white + "44"}
          strokeWidth="1.5"
        />

        {/* Y axis labels */}
        {[0, 100, 200, 300].map((v) => (
          <text key={v} x={graphX - 8} y={graphY + graphHeight - (v / 300) * graphHeight + 4} textAnchor="end" fill={colors.muted + "66"} fontSize="10" fontFamily="Space Grotesk">
            {v}
          </text>
        ))}
      </g>

      {/* Sensor feedback panel */}
      <g transform="translate(80, 430)">
        <text x="270" y="0" textAnchor="middle" fill={colors.muted} fontSize="14" fontFamily="Space Grotesk">
          Sensor feedback loop
        </text>

        {/* Feedback chain */}
        {[
          { label: "Camera", detail: "overhang droop?", x: 0 },
          { label: "Encoder", detail: "flow keeping up?", x: 150 },
          { label: "Thermal", detail: "layer cooled?", x: 300 },
          { label: "Adjust", detail: "speed ↕", x: 450 },
        ].map((item, i) => (
          <g key={i}>
            <rect x={item.x} y="15" width="120" height="45" rx="6"
              fill={adaptiveness > 0.3 ? zoneColor + "18" : colors.deepBlue}
              stroke={adaptiveness > 0.3 ? zoneColor + "44" : colors.muted + "22"}
              strokeWidth="1.5"
            />
            <text x={item.x + 60} y="33" textAnchor="middle" fill={colors.text} fontSize="13" fontWeight="600" fontFamily="Space Grotesk">
              {item.label}
            </text>
            <text x={item.x + 60} y="50" textAnchor="middle" fill={colors.muted} fontSize="10" fontFamily="Space Grotesk">
              {item.detail}
            </text>
            {i < 3 && (
              <polygon points={`${item.x + 128},37 ${item.x + 142},37 ${item.x + 135},37`} fill={colors.muted + "66"}>
                <line x1={item.x + 120} y1="37" x2={item.x + 150} y2="37" stroke={colors.muted + "44"} strokeWidth="1.5" />
              </polygon>
            )}
            {i < 3 && (
              <line x1={item.x + 120} y1="37" x2={item.x + 150} y2="37" stroke={adaptiveness > 0.3 ? zoneColor + "66" : colors.muted + "22"} strokeWidth="1.5" />
            )}
          </g>
        ))}

        {/* Status */}
        <text x="270" y="80" textAnchor="middle" fill={zoneColor} fontSize="13" fontFamily="Space Grotesk">
          {value < 0.3
            ? "Feedback loop inactive — running blind at fixed speed"
            : value > 0.7
            ? "Reacting to noise — speed changes every millisecond"
            : "Smooth, measured adjustments — speed matches each feature's needs"}
        </text>
      </g>
    </svg>
  );
};

export const AdaptiveSpeed: React.FC = () => (
  <CalibrationVar
    index={1}
    category="Live Tuning"
    title="Adaptive Speed"
    description="Real-time speed adjustment per move type based on sensor feedback. Camera, encoder, and thermal sensors tell the system when to speed up or slow down."
    unit="dynamic"
    rangeLabels={{ min: "Off (fixed)", correct: "Smart adaptation", max: "Over-reactive" }}
    impacts={{
      low: "One speed for everything. Overhangs droop at infill speed. Infill crawls at overhang speed.",
      correct: "Speed matches each feature's needs in real-time. Fast infill, careful overhangs.",
      high: "Constant jittery adjustments. Speed oscillates, surface quality degrades from acceleration.",
    }}
    dependencies={["Speed Profile"]}
    note="Builds on the calibrated speed profile — live tuning adjusts around it."
    renderDiagram={(v) => <AdaptiveSpeedDiagram value={v} />}
  />
);

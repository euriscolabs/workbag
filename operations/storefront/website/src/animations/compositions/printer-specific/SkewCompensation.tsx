import React from "react";
import { interpolate } from "remotion";
import { CalibrationVar, getZoneColor } from "../../components/CalibrationVar";
import { colors } from "../../brand";

/**
 * Diagram: X/Y axes shown from above.
 * Slider controls skew angle:
 *   0.0 = skewed — Y axis is not perpendicular to X
 *   0.5 = square — 90° angles
 *   1.0 = over-corrected — skewed the other way
 */
const SkewDiagram: React.FC<{ value: number }> = ({ value }) => {
  const zoneColor = getZoneColor(value);

  // Skew angle in degrees (deviation from 90°)
  const skewDeg = interpolate(value, [0, 0.5, 1], [6, 0, -4]);
  const skewRad = (skewDeg * Math.PI) / 180;

  // Transform a point by skew
  const skew = (x: number, y: number): [number, number] => {
    return [x + y * Math.tan(skewRad), y];
  };

  // Reference square corners (100x100)
  const squareSize = 140;
  const ox = 350;
  const oy = 200;

  const corners = [
    [0, 0],
    [squareSize, 0],
    [squareSize, squareSize],
    [0, squareSize],
  ];

  const skewedCorners = corners.map(([x, y]) => {
    const [sx, sy] = skew(x - squareSize / 2, y - squareSize / 2);
    return [ox + sx, oy + sy];
  });

  const skewedPath = skewedCorners.map(([x, y]) => `${x},${y}`).join(" ");
  const idealPath = corners.map(([x, y]) => `${ox + x - squareSize / 2},${oy + y - squareSize / 2}`).join(" ");

  // Angle display
  const angleDisplay = (90 + skewDeg).toFixed(1);

  return (
    <svg width="700" height="550" viewBox="0 0 700 550">
      {/* Axes */}
      <text x="350" y="35" textAnchor="middle" fill={colors.muted} fontSize="16" fontFamily="Space Grotesk">
        X/Y axis alignment — top view
      </text>

      {/* X axis */}
      <line x1="100" y1={oy + squareSize / 2 + 40} x2="600" y2={oy + squareSize / 2 + 40} stroke={colors.muted + "44"} strokeWidth="2" />
      <polygon points={`600,${oy + squareSize / 2 + 35} 610,${oy + squareSize / 2 + 40} 600,${oy + squareSize / 2 + 45}`} fill={colors.muted + "44"} />
      <text x="620" y={oy + squareSize / 2 + 45} fill={colors.muted} fontSize="16" fontWeight="bold" fontFamily="Space Grotesk">
        X
      </text>

      {/* Y axis (skewed) */}
      {(() => {
        const [yx, yy] = skew(0, -200);
        return (
          <>
            <line
              x1={ox}
              y1={oy + squareSize / 2 + 40}
              x2={ox + yx}
              y2={oy + squareSize / 2 + 40 + yy}
              stroke={zoneColor + "66"}
              strokeWidth="2"
            />
            <polygon
              points={`${ox + yx - 5},${oy + squareSize / 2 + 40 + yy + 10} ${ox + yx},${oy + squareSize / 2 + 40 + yy} ${ox + yx + 5},${oy + squareSize / 2 + 40 + yy + 10}`}
              fill={zoneColor + "66"}
            />
            <text x={ox + yx - 15} y={oy + squareSize / 2 + 40 + yy} fill={zoneColor} fontSize="16" fontWeight="bold" fontFamily="Space Grotesk">
              Y
            </text>
          </>
        );
      })()}

      {/* Ideal Y axis (dashed, for reference) */}
      <line x1={ox} y1={oy + squareSize / 2 + 40} x2={ox} y2={oy - squareSize / 2 - 40} stroke={colors.correct + "33"} strokeWidth="1.5" strokeDasharray="6,4" />

      {/* Angle arc */}
      <path
        d={`M ${ox},${oy + squareSize / 2 + 10} A 30,30 0 0,1 ${ox + 30 * Math.sin(skewRad)},${oy + squareSize / 2 + 10 - 30}`}
        fill="none"
        stroke={zoneColor}
        strokeWidth="2"
      />
      <text
        x={ox + 40}
        y={oy + squareSize / 2}
        fill={zoneColor}
        fontSize="18"
        fontWeight="bold"
        fontFamily="Space Grotesk"
      >
        {angleDisplay}°
      </text>

      {/* Target square (ideal 90°) */}
      <polygon points={idealPath} fill="none" stroke={colors.correct + "33"} strokeWidth="2" strokeDasharray="6,4" />

      {/* Actual printed shape (skewed) */}
      <polygon points={skewedPath} fill={zoneColor + "18"} stroke={zoneColor} strokeWidth="2.5" />

      {/* Dimension labels on printed shape */}
      <text
        x={(skewedCorners[0][0] + skewedCorners[1][0]) / 2}
        y={skewedCorners[0][1] - 10}
        textAnchor="middle"
        fill={colors.muted}
        fontSize="13"
        fontFamily="Space Grotesk"
      >
        {squareSize}mm
      </text>

      {/* Assembly test — two parts that should fit */}
      <g transform="translate(200, 410)">
        <text x="150" y="0" textAnchor="middle" fill={colors.muted} fontSize="14" fontFamily="Space Grotesk">
          Part assembly test
        </text>

        {/* Part A (pocket) */}
        <rect x="50" y="20" width="80" height="60" fill="none" stroke={colors.muted} strokeWidth="2" rx="2" />
        <rect x="65" y="30" width="50" height="40" fill={colors.deepBlue} stroke={colors.muted + "66"} strokeWidth="1" rx="1" />
        <text x="90" y="82" textAnchor="middle" fill={colors.muted} fontSize="11" fontFamily="Space Grotesk">pocket</text>

        {/* Part B (tab) — skewed */}
        {(() => {
          const tabWidth = 46;
          const tabHeight = 36;
          const tabX = 220;
          const tabSkew = skewDeg * 0.8;
          return (
            <>
              <polygon
                points={`
                  ${tabX},${24}
                  ${tabX + tabWidth},${24}
                  ${tabX + tabWidth + tabSkew},${24 + tabHeight}
                  ${tabX + tabSkew},${24 + tabHeight}
                `}
                fill={zoneColor + "44"}
                stroke={zoneColor}
                strokeWidth="2"
              />
              <text x={tabX + tabWidth / 2} y="82" textAnchor="middle" fill={colors.muted} fontSize="11" fontFamily="Space Grotesk">tab</text>

              {/* Fit indicator */}
              <text
                x="175"
                y="52"
                textAnchor="middle"
                fill={zoneColor}
                fontSize="20"
                fontFamily="Space Grotesk"
              >
                {Math.abs(skewDeg) < 0.5 ? "→ fits ←" : "→ ✗ ←"}
              </text>
            </>
          );
        })()}
      </g>
    </svg>
  );
};

export const SkewCompensation: React.FC = () => (
  <CalibrationVar
    index={9}
    category="Printer-Specific"
    title="Skew Compensation"
    description="Corrects non-perpendicularity between axes. If X and Y aren't at exactly 90°, every print is a parallelogram."
    unit="degrees"
    rangeLabels={{ min: "1-2° skewed", correct: "~90°", max: "Over-corrected" }}
    impacts={{
      low: "Rectangles print as parallelograms. Parts that should mate don't fit.",
      correct: "True 90° angles. Parts are dimensionally accurate and assemble correctly.",
      high: "Same problem, opposite direction. Skewed the other way.",
    }}
    dependencies={["Axis Steps/mm", "Belt Tension", "Backlash"]}
    renderDiagram={(v) => <SkewDiagram value={v} />}
  />
);

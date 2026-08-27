import { useRef } from "react";
import { Slider } from "@/components/atoms";
import { useSetVar, useVar } from "@/stores";

const VIEW_WIDTH = 600;
const VIEW_HEIGHT = 360;
const PAD_LEFT = 70;
const PAD_RIGHT = 40;
const PAD_TOP = 30;
const PAD_BOTTOM = 52;
const PLOT_WIDTH = VIEW_WIDTH - PAD_LEFT - PAD_RIGHT;
const PLOT_HEIGHT = VIEW_HEIGHT - PAD_TOP - PAD_BOTTOM;
const MINUTES_MAX = 12;
const COST_MAX = 5;
const ZIP_COLOR = "#6366f1";

const toX = (minutes: number) => PAD_LEFT + (minutes / MINUTES_MAX) * PLOT_WIDTH;
const toY = (cost: number) => PAD_TOP + PLOT_HEIGHT - (cost / COST_MAX) * PLOT_HEIGHT;

/**
 * One deal drawn as a straight line with a marker students slide along it.
 * Dashed guides run to both axes, so a ride length can be turned into a cost or
 * a cost traced back to a ride length.
 */
export const SlideAlongDealLine = () => {
    const unlockFee = useVar("zipUnlockFee", 1) as number;
    const perMinute = useVar("zipPerMinute", 0.3) as number;
    const minutes = useVar("zipReadMinutes", 4) as number;
    const setVar = useSetVar();

    const svgRef = useRef<SVGSVGElement | null>(null);
    const cost = unlockFee + perMinute * minutes;

    const moveMarkerFromPointer = (clientX: number) => {
        const svg = svgRef.current;
        if (!svg) return;
        const rect = svg.getBoundingClientRect();
        const svgX = ((clientX - rect.left) / rect.width) * VIEW_WIDTH;
        const raw = ((svgX - PAD_LEFT) / PLOT_WIDTH) * MINUTES_MAX;
        const clamped = Math.min(MINUTES_MAX, Math.max(0, Math.round(raw)));
        if (clamped !== minutes) setVar("zipReadMinutes", clamped);
    };

    return (
        <div className="w-full rounded-xl border border-slate-200 bg-white p-4">
            <div className="mb-2 text-sm font-semibold text-slate-700">
                Zip: £{unlockFee.toFixed(2)} to unlock, then £{perMinute.toFixed(2)} a minute
            </div>

            <svg
                ref={svgRef}
                width="100%"
                viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
                role="img"
                aria-label="The Zip deal as a straight line with a marker that can be slid along it"
                className="cursor-ew-resize touch-none select-none"
                onPointerDown={(event) => {
                    event.currentTarget.setPointerCapture(event.pointerId);
                    moveMarkerFromPointer(event.clientX);
                }}
                onPointerMove={(event) => {
                    if (event.buttons === 1) moveMarkerFromPointer(event.clientX);
                }}
            >
                {/* grid + cost labels */}
                {Array.from({ length: COST_MAX + 1 }, (_, value) => value).map((value) => (
                    <g key={`cost-${value}`}>
                        <line
                            x1={PAD_LEFT}
                            y1={toY(value)}
                            x2={PAD_LEFT + PLOT_WIDTH}
                            y2={toY(value)}
                            stroke="#e2e8f0"
                            strokeWidth={1}
                        />
                        <text
                            x={PAD_LEFT - 10}
                            y={toY(value) + 4}
                            textAnchor="end"
                            fontSize={12}
                            fill="#64748b"
                        >
                            £{value}
                        </text>
                    </g>
                ))}

                {/* minute grid + labels */}
                {Array.from({ length: MINUTES_MAX / 2 + 1 }, (_, index) => index * 2).map((tick) => (
                    <g key={`minutes-${tick}`}>
                        <line
                            x1={toX(tick)}
                            y1={PAD_TOP}
                            x2={toX(tick)}
                            y2={PAD_TOP + PLOT_HEIGHT}
                            stroke="#eef2f7"
                            strokeWidth={1}
                        />
                        <text
                            x={toX(tick)}
                            y={PAD_TOP + PLOT_HEIGHT + 20}
                            textAnchor="middle"
                            fontSize={12}
                            fill="#64748b"
                        >
                            {tick}
                        </text>
                    </g>
                ))}

                {/* axes */}
                <line
                    x1={PAD_LEFT}
                    y1={PAD_TOP}
                    x2={PAD_LEFT}
                    y2={PAD_TOP + PLOT_HEIGHT}
                    stroke="#94a3b8"
                    strokeWidth={1.5}
                />
                <line
                    x1={PAD_LEFT}
                    y1={PAD_TOP + PLOT_HEIGHT}
                    x2={PAD_LEFT + PLOT_WIDTH}
                    y2={PAD_TOP + PLOT_HEIGHT}
                    stroke="#94a3b8"
                    strokeWidth={1.5}
                />

                {/* axis titles */}
                <text
                    x={PAD_LEFT + PLOT_WIDTH / 2}
                    y={VIEW_HEIGHT - 14}
                    textAnchor="middle"
                    fontSize={12}
                    fill="#475569"
                >
                    Minutes ridden (x)
                </text>
                <text
                    x={18}
                    y={PAD_TOP + PLOT_HEIGHT / 2}
                    textAnchor="middle"
                    fontSize={12}
                    fill="#475569"
                    transform={`rotate(-90 18 ${PAD_TOP + PLOT_HEIGHT / 2})`}
                >
                    Cost in pounds (y)
                </text>

                {/* the deal line */}
                <line
                    x1={toX(0)}
                    y1={toY(unlockFee)}
                    x2={toX(MINUTES_MAX)}
                    y2={toY(unlockFee + perMinute * MINUTES_MAX)}
                    stroke={ZIP_COLOR}
                    strokeWidth={2.5}
                />

                {/* guides to both axes */}
                <line
                    x1={toX(minutes)}
                    y1={toY(cost)}
                    x2={toX(minutes)}
                    y2={PAD_TOP + PLOT_HEIGHT}
                    stroke={ZIP_COLOR}
                    strokeWidth={1.5}
                    strokeDasharray="5 4"
                />
                <line
                    x1={toX(minutes)}
                    y1={toY(cost)}
                    x2={PAD_LEFT}
                    y2={toY(cost)}
                    stroke={ZIP_COLOR}
                    strokeWidth={1.5}
                    strokeDasharray="5 4"
                />

                {/* axis readouts, anchored back toward the plot */}
                <text
                    x={toX(minutes)}
                    y={PAD_TOP + PLOT_HEIGHT + 38}
                    textAnchor="middle"
                    fontSize={12}
                    fontWeight={600}
                    fill={ZIP_COLOR}
                >
                    x = {minutes}
                </text>
                <text
                    x={PAD_LEFT - 10}
                    y={toY(cost) - 10}
                    textAnchor="end"
                    fontSize={12}
                    fontWeight={600}
                    fill={ZIP_COLOR}
                >
                    y = £{cost.toFixed(2)}
                </text>

                {/* the draggable marker */}
                <circle
                    cx={toX(minutes)}
                    cy={toY(cost)}
                    r={12}
                    fill={ZIP_COLOR}
                    opacity={0.15}
                />
                <circle
                    cx={toX(minutes)}
                    cy={toY(cost)}
                    r={7}
                    fill={ZIP_COLOR}
                    stroke="#ffffff"
                    strokeWidth={2}
                />
            </svg>

            {/* slider for keyboard and fine control */}
            <div className="mt-2">
                <Slider
                    value={[minutes]}
                    min={0}
                    max={MINUTES_MAX}
                    step={1}
                    onValueChange={(value) => setVar("zipReadMinutes", value[0])}
                />
            </div>

            <div className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-800">
                A <span className="font-semibold">{minutes} minute</span> ride costs{" "}
                <span className="font-semibold" style={{ color: ZIP_COLOR }}>
                    £{cost.toFixed(2)}
                </span>{" "}
                — that is {unlockFee.toFixed(2)} + {minutes} × {perMinute.toFixed(2)}.
            </div>
        </div>
    );
};

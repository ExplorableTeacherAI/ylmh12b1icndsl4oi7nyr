import { Slider } from "@/components/atoms";
import { useSetVar, useVar } from "@/stores";

const VIEW_WIDTH = 620;
const VIEW_HEIGHT = 380;
const PAD_LEFT = 66;
const PAD_RIGHT = 96;
const PAD_TOP = 28;
const PAD_BOTTOM = 52;
const PLOT_WIDTH = VIEW_WIDTH - PAD_LEFT - PAD_RIGHT;
const PLOT_HEIGHT = VIEW_HEIGHT - PAD_TOP - PAD_BOTTOM;
const MINUTES_MAX = 24;
const COST_MAX = 9;
const GAP_BAR_MAX = 3;

const ZIP_COLOR = "#6366f1";
const GLIDE_COLOR = "#f97316";

const toX = (minutes: number) => PAD_LEFT + (minutes / MINUTES_MAX) * PLOT_WIDTH;
const toY = (cost: number) => PAD_TOP + PLOT_HEIGHT - (cost / COST_MAX) * PLOT_HEIGHT;

/**
 * Both scooter deals as lines on one grid, with the vertical gap between them
 * drawn at the chosen ride length and mirrored in a bar underneath.
 */
export const TwoDealsGapTracker = () => {
    const minutes = useVar("rideMinutes", 4) as number;
    const zipUnlockFee = useVar("zipUnlockFee", 1) as number;
    const zipPerMinute = useVar("zipPerMinute", 0.3) as number;
    const glideUnlockFee = useVar("glideUnlockFee", 3) as number;
    const glidePerMinute = useVar("glidePerMinute", 0.1) as number;
    const setVar = useSetVar();

    const zipCost = zipUnlockFee + zipPerMinute * minutes;
    const glideCost = glideUnlockFee + glidePerMinute * minutes;
    const gap = Math.abs(zipCost - glideCost);
    const isLevel = gap < 0.005;
    const cheaper = isLevel ? null : zipCost < glideCost ? "Zip" : "Glide";
    const cheaperColor = cheaper === "Zip" ? ZIP_COLOR : GLIDE_COLOR;
    const gapBarPercent = Math.min(100, (gap / GAP_BAR_MAX) * 100);

    return (
        <div className="w-full rounded-xl border border-slate-200 bg-white p-4">
            {/* ride length control */}
            <div className="mb-4">
                <div className="mb-2 flex items-baseline justify-between">
                    <span className="text-sm font-semibold text-slate-700">
                        Ride length (x): {minutes} min
                    </span>
                    <span className="text-xs text-slate-500">drag to change the ride</span>
                </div>
                <Slider
                    value={[minutes]}
                    min={0}
                    max={MINUTES_MAX}
                    step={1}
                    onValueChange={(value) => setVar("rideMinutes", value[0])}
                />
            </div>

            <svg
                width="100%"
                viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
                role="img"
                aria-label="Cost of two scooter deals against minutes ridden, with the gap between them marked"
            >
                {/* grid + cost labels */}
                {Array.from({ length: COST_MAX + 1 }, (_, cost) => (
                    <g key={`cost-${cost}`}>
                        <line
                            x1={PAD_LEFT}
                            y1={toY(cost)}
                            x2={PAD_LEFT + PLOT_WIDTH}
                            y2={toY(cost)}
                            stroke="#e2e8f0"
                            strokeWidth={1}
                        />
                        <text
                            x={PAD_LEFT - 10}
                            y={toY(cost) + 4}
                            textAnchor="end"
                            fontSize={12}
                            fill="#64748b"
                        >
                            £{cost}
                        </text>
                    </g>
                ))}

                {/* minute labels */}
                {Array.from({ length: MINUTES_MAX / 4 + 1 }, (_, index) => index * 4).map((tick) => (
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

                {/* the two deal lines */}
                <line
                    x1={toX(0)}
                    y1={toY(zipUnlockFee)}
                    x2={toX(MINUTES_MAX)}
                    y2={toY(zipUnlockFee + zipPerMinute * MINUTES_MAX)}
                    stroke={ZIP_COLOR}
                    strokeWidth={2.5}
                />
                <line
                    x1={toX(0)}
                    y1={toY(glideUnlockFee)}
                    x2={toX(MINUTES_MAX)}
                    y2={toY(glideUnlockFee + glidePerMinute * MINUTES_MAX)}
                    stroke={GLIDE_COLOR}
                    strokeWidth={2.5}
                />

                {/* line labels, anchored back toward the plot */}
                <text
                    x={VIEW_WIDTH - 12}
                    y={toY(zipUnlockFee + zipPerMinute * MINUTES_MAX) + 4}
                    textAnchor="end"
                    fontSize={12}
                    fontWeight={600}
                    fill={ZIP_COLOR}
                >
                    Zip
                </text>
                <text
                    x={VIEW_WIDTH - 12}
                    y={toY(glideUnlockFee + glidePerMinute * MINUTES_MAX) + 4}
                    textAnchor="end"
                    fontSize={12}
                    fontWeight={600}
                    fill={GLIDE_COLOR}
                >
                    Glide
                </text>

                {/* the gap at the chosen ride length */}
                <line
                    x1={toX(minutes)}
                    y1={PAD_TOP}
                    x2={toX(minutes)}
                    y2={PAD_TOP + PLOT_HEIGHT}
                    stroke="#cbd5e1"
                    strokeWidth={1}
                    strokeDasharray="4 4"
                />
                {!isLevel && (
                    <line
                        x1={toX(minutes)}
                        y1={toY(zipCost)}
                        x2={toX(minutes)}
                        y2={toY(glideCost)}
                        stroke="#0f172a"
                        strokeWidth={3}
                    />
                )}
                <circle cx={toX(minutes)} cy={toY(zipCost)} r={5.5} fill={ZIP_COLOR} />
                <circle cx={toX(minutes)} cy={toY(glideCost)} r={5.5} fill={GLIDE_COLOR} />

                {isLevel && (
                    <text
                        x={toX(minutes)}
                        y={toY(zipCost) - 16}
                        textAnchor="middle"
                        fontSize={12}
                        fontWeight={700}
                        fill="#0f172a"
                    >
                        same cost
                    </text>
                )}
            </svg>

            {/* readouts and gap bar */}
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg bg-slate-50 px-3 py-2 text-sm">
                    <div style={{ color: ZIP_COLOR }} className="font-semibold">
                        Zip: £{zipCost.toFixed(2)}
                    </div>
                    <div style={{ color: GLIDE_COLOR }} className="font-semibold">
                        Glide: £{glideCost.toFixed(2)}
                    </div>
                </div>
                <div className="rounded-lg bg-slate-50 px-3 py-2">
                    <div className="mb-1.5 text-sm font-semibold text-slate-700">
                        {isLevel
                            ? "Gap: £0.00 — the deals cost the same"
                            : `Gap: £${gap.toFixed(2)} — ${cheaper} is cheaper`}
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
                        <div
                            className="h-full rounded-full transition-all duration-200"
                            style={{
                                width: `${gapBarPercent}%`,
                                backgroundColor: isLevel ? "#94a3b8" : cheaperColor,
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

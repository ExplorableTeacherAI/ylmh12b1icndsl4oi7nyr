import { useState, type ReactNode } from "react";
import { Button } from "@/components/atoms";
import { useVar } from "@/stores";

const VIEW_WIDTH = 620;
const VIEW_HEIGHT = 360;
const PAD_LEFT = 66;
const PAD_RIGHT = 96;
const PAD_TOP = 28;
const PAD_BOTTOM = 52;
const PLOT_WIDTH = VIEW_WIDTH - PAD_LEFT - PAD_RIGHT;
const PLOT_HEIGHT = VIEW_HEIGHT - PAD_TOP - PAD_BOTTOM;
const MINUTES_MAX = 20;
const COST_MAX = 8;

const ZIP_COLOR = "#6366f1";
const GLIDE_COLOR = "#f97316";

const toX = (minutes: number) => PAD_LEFT + (minutes / MINUTES_MAX) * PLOT_WIDTH;
const toY = (cost: number) => PAD_TOP + PLOT_HEIGHT - (cost / COST_MAX) * PLOT_HEIGHT;

/**
 * The meeting point of the two deals, with dashed guides down to each axis and a
 * fill-in-the-blank sentence students complete from the two values they read off.
 */
export const CrossingPointSentence = () => {
    const zipUnlockFee = useVar("zipUnlockFee", 1) as number;
    const zipPerMinute = useVar("zipPerMinute", 0.3) as number;
    const glideUnlockFee = useVar("glideUnlockFee", 3) as number;
    const glidePerMinute = useVar("glidePerMinute", 0.1) as number;

    const [minutesChoice, setMinutesChoice] = useState<number | null>(null);
    const [costChoice, setCostChoice] = useState<number | null>(null);
    const [checked, setChecked] = useState(false);

    const rateDifference = zipPerMinute - glidePerMinute;
    const crossingMinutes = rateDifference === 0 ? null : (glideUnlockFee - zipUnlockFee) / rateDifference;
    const crossingCost = crossingMinutes === null ? null : zipUnlockFee + zipPerMinute * crossingMinutes;

    const minutesOptions = crossingMinutes === null
        ? []
        : [crossingMinutes - 6, crossingMinutes - 2, crossingMinutes, crossingMinutes + 4]
            .filter((value) => value >= 0)
            .sort((a, b) => a - b);
    const costOptions = crossingCost === null
        ? []
        : [crossingCost - 1, crossingCost, crossingCost + 1, crossingCost + 3]
            .filter((value) => value >= 0)
            .sort((a, b) => a - b);

    const minutesRight = minutesChoice !== null && crossingMinutes !== null
        && Math.abs(minutesChoice - crossingMinutes) < 0.001;
    const costRight = costChoice !== null && crossingCost !== null
        && Math.abs(costChoice - crossingCost) < 0.001;
    const bothRight = minutesRight && costRight;

    const feedback = () => {
        if (bothRight) {
            return `Exactly. At ${crossingMinutes} minutes both apps charge £${crossingCost?.toFixed(2)}, so on that one ride there is nothing to choose between them.`;
        }
        if (!minutesRight && !costRight) {
            return "Both blanks are off. The first blank comes from reading straight down from the meeting point to the minutes axis, the second from reading straight across to the pounds axis.";
        }
        if (!minutesRight) {
            return "The money is right, but check the minutes: follow the dashed line straight down from the meeting point to the axis along the bottom.";
        }
        return "The minutes are right, but check the money: follow the dashed line straight across from the meeting point to the axis up the side.";
    };

    const Chip = ({
        active,
        onClick,
        children,
    }: {
        active: boolean;
        onClick: () => void;
        children: ReactNode;
    }) => (
        <button
            type="button"
            onClick={onClick}
            className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                active
                    ? "border-slate-800 bg-slate-800 text-white"
                    : "border-slate-300 bg-white text-slate-700 hover:border-slate-500"
            }`}
        >
            {children}
        </button>
    );

    return (
        <div className="w-full rounded-xl border border-slate-200 bg-white p-4">
            <svg
                width="100%"
                viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
                role="img"
                aria-label="Two scooter deals meeting at one point, with dashed guides to each axis"
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

                {/* deal lines */}
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

                {/* dashed guides from the meeting point to both axes */}
                {crossingMinutes !== null && crossingCost !== null && (
                    <g>
                        <line
                            x1={toX(crossingMinutes)}
                            y1={toY(crossingCost)}
                            x2={toX(crossingMinutes)}
                            y2={PAD_TOP + PLOT_HEIGHT}
                            stroke="#0f172a"
                            strokeWidth={1.5}
                            strokeDasharray="5 4"
                        />
                        <line
                            x1={toX(crossingMinutes)}
                            y1={toY(crossingCost)}
                            x2={PAD_LEFT}
                            y2={toY(crossingCost)}
                            stroke="#0f172a"
                            strokeWidth={1.5}
                            strokeDasharray="5 4"
                        />
                        <circle
                            cx={toX(crossingMinutes)}
                            cy={toY(crossingCost)}
                            r={7}
                            fill="#0f172a"
                        />
                        <text
                            x={toX(crossingMinutes) + 12}
                            y={toY(crossingCost) - 12}
                            fontSize={12}
                            fontWeight={600}
                            fill="#0f172a"
                        >
                            they meet here
                        </text>
                    </g>
                )}
            </svg>

            {/* fill-in-the-blank sentence */}
            <div className="mt-4 rounded-lg bg-slate-50 p-3">
                <div className="flex flex-wrap items-center gap-2 text-sm text-slate-800">
                    <span>At</span>
                    <span className="min-w-14 rounded-md border border-dashed border-slate-400 bg-white px-2 py-1 text-center font-semibold">
                        {minutesChoice === null ? "?" : minutesChoice}
                    </span>
                    <span>minutes, both Zip and Glide cost</span>
                    <span className="min-w-16 rounded-md border border-dashed border-slate-400 bg-white px-2 py-1 text-center font-semibold">
                        {costChoice === null ? "?" : `£${costChoice.toFixed(2)}`}
                    </span>
                    <span>.</span>
                </div>

                <div className="mt-3 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                            Minutes
                        </span>
                        {minutesOptions.map((value) => (
                            <Chip
                                key={`minutes-option-${value}`}
                                active={minutesChoice === value}
                                onClick={() => {
                                    setMinutesChoice(value);
                                    setChecked(false);
                                }}
                            >
                                {value}
                            </Chip>
                        ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                            Cost
                        </span>
                        {costOptions.map((value) => (
                            <Chip
                                key={`cost-option-${value}`}
                                active={costChoice === value}
                                onClick={() => {
                                    setCostChoice(value);
                                    setChecked(false);
                                }}
                            >
                                £{value.toFixed(2)}
                            </Chip>
                        ))}
                    </div>
                </div>

                <div className="mt-3">
                    <Button
                        size="sm"
                        disabled={minutesChoice === null || costChoice === null}
                        onClick={() => setChecked(true)}
                    >
                        Check the sentence
                    </Button>
                </div>

                {checked && (
                    <div
                        className={`mt-3 rounded-lg border px-3 py-2 text-sm ${
                            bothRight
                                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                                : "border-amber-200 bg-amber-50 text-amber-800"
                        }`}
                    >
                        {feedback()}
                    </div>
                )}
            </div>
        </div>
    );
};

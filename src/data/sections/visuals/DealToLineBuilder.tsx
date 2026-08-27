import { useState } from "react";
import { Button } from "@/components/atoms";
import { useVar } from "@/stores";

const RIDE_LENGTHS = [2, 4, 6, 8, 10];

const VIEW_WIDTH = 560;
const VIEW_HEIGHT = 360;
const PAD_LEFT = 66;
const PAD_RIGHT = 30;
const PAD_TOP = 28;
const PAD_BOTTOM = 50;
const PLOT_WIDTH = VIEW_WIDTH - PAD_LEFT - PAD_RIGHT;
const PLOT_HEIGHT = VIEW_HEIGHT - PAD_TOP - PAD_BOTTOM;
const MINUTES_MAX = 12;
const COST_MAX = 5;
const ZIP_COLOR = "#6366f1";

const toX = (minutes: number) => PAD_LEFT + (minutes / MINUTES_MAX) * PLOT_WIDTH;
const toY = (cost: number) => PAD_TOP + PLOT_HEIGHT - (cost / COST_MAX) * PLOT_HEIGHT;

/**
 * Students work out the cost of one Zip ride at a time. Each revealed row of the
 * table drops onto the axes as a point, and once every row is revealed they can
 * join the points into a straight line.
 */
export const DealToLineBuilder = () => {
    const unlockFee = useVar("zipUnlockFee", 1) as number;
    const perMinute = useVar("zipPerMinute", 0.3) as number;

    const [revealed, setRevealed] = useState<number[]>([]);
    const [showLine, setShowLine] = useState(false);

    const costFor = (minutes: number) => unlockFee + perMinute * minutes;
    const allRevealed = revealed.length === RIDE_LENGTHS.length;

    const reveal = (minutes: number) => {
        setRevealed((current) =>
            current.includes(minutes) ? current : [...current, minutes],
        );
    };

    const reset = () => {
        setRevealed([]);
        setShowLine(false);
    };

    return (
        <div className="w-full rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex flex-col gap-5 md:flex-row md:items-start">
                {/* Cost table */}
                <div className="md:w-[46%]">
                    <div className="mb-2 text-sm font-semibold text-slate-700">
                        Zip: £{unlockFee.toFixed(2)} to unlock, then £{perMinute.toFixed(2)} a minute
                    </div>
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-200 text-left text-slate-500">
                                <th className="py-1.5 pr-2 font-medium">Minutes (x)</th>
                                <th className="py-1.5 font-medium">Cost (y)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {RIDE_LENGTHS.map((minutes) => {
                                const isOpen = revealed.includes(minutes);
                                return (
                                    <tr key={minutes} className="border-b border-slate-100 align-middle">
                                        <td className="py-2 pr-2 font-semibold text-slate-800">{minutes}</td>
                                        <td className="py-2">
                                            {isOpen ? (
                                                <span className="text-slate-700">
                                                    {unlockFee.toFixed(2)} + {minutes} × {perMinute.toFixed(2)} ={" "}
                                                    <span className="font-semibold" style={{ color: ZIP_COLOR }}>
                                                        £{costFor(minutes).toFixed(2)}
                                                    </span>
                                                </span>
                                            ) : (
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="h-7 px-2 text-xs"
                                                    onClick={() => reveal(minutes)}
                                                >
                                                    Work it out
                                                </Button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    <div className="mt-3 flex flex-wrap gap-2">
                        <Button
                            size="sm"
                            disabled={!allRevealed || showLine}
                            onClick={() => setShowLine(true)}
                        >
                            Join the points
                        </Button>
                        <Button size="sm" variant="ghost" onClick={reset}>
                            Start again
                        </Button>
                    </div>
                    <div className="mt-2 text-xs text-slate-500">
                        {allRevealed
                            ? showLine
                                ? "Every cost for this deal sits on that one straight line."
                                : "All five costs are plotted — now join them up."
                            : "Reveal a cost and it appears on the grid as a point."}
                    </div>
                </div>

                {/* Graph */}
                <div className="md:w-[54%]">
                    <svg
                        width="100%"
                        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
                        role="img"
                        aria-label="Graph of Zip ride cost against minutes ridden"
                    >
                        {/* horizontal grid lines and cost labels */}
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

                        {/* vertical grid lines and minute labels */}
                        {Array.from({ length: MINUTES_MAX / 2 + 1 }, (_, index) => index * 2).map(
                            (minutes) => (
                                <g key={`minutes-${minutes}`}>
                                    <line
                                        x1={toX(minutes)}
                                        y1={PAD_TOP}
                                        x2={toX(minutes)}
                                        y2={PAD_TOP + PLOT_HEIGHT}
                                        stroke="#eef2f7"
                                        strokeWidth={1}
                                    />
                                    <text
                                        x={toX(minutes)}
                                        y={PAD_TOP + PLOT_HEIGHT + 20}
                                        textAnchor="middle"
                                        fontSize={12}
                                        fill="#64748b"
                                    >
                                        {minutes}
                                    </text>
                                </g>
                            ),
                        )}

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
                            y={VIEW_HEIGHT - 12}
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

                        {/* the joined line */}
                        {showLine && (
                            <line
                                x1={toX(0)}
                                y1={toY(costFor(0))}
                                x2={toX(MINUTES_MAX)}
                                y2={toY(costFor(MINUTES_MAX))}
                                stroke={ZIP_COLOR}
                                strokeWidth={2.5}
                            />
                        )}

                        {/* plotted points */}
                        {RIDE_LENGTHS.filter((minutes) => revealed.includes(minutes)).map((minutes) => (
                            <g key={`point-${minutes}`}>
                                <circle cx={toX(minutes)} cy={toY(costFor(minutes))} r={5.5} fill={ZIP_COLOR} />
                                <text
                                    x={toX(minutes)}
                                    y={toY(costFor(minutes)) - 12}
                                    textAnchor="middle"
                                    fontSize={11}
                                    fill={ZIP_COLOR}
                                >
                                    £{costFor(minutes).toFixed(2)}
                                </text>
                            </g>
                        ))}
                    </svg>
                </div>
            </div>
        </div>
    );
};

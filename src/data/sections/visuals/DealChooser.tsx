import { useState } from "react";
import { Slider } from "@/components/atoms";
import { useSetVar, useVar } from "@/stores";

const VIEW_WIDTH = 620;
const VIEW_HEIGHT = 360;
const PAD_LEFT = 70;
const PAD_RIGHT = 110;
const PAD_TOP = 28;
const PAD_BOTTOM = 52;
const PLOT_WIDTH = VIEW_WIDTH - PAD_LEFT - PAD_RIGHT;
const PLOT_HEIGHT = VIEW_HEIGHT - PAD_TOP - PAD_BOTTOM;
const MINUTES_MAX = 24;
const COST_MAX = 10;

const toX = (minutes: number) => PAD_LEFT + (minutes / MINUTES_MAX) * PLOT_WIDTH;
const toY = (cost: number) => PAD_TOP + PLOT_HEIGHT - (cost / COST_MAX) * PLOT_HEIGHT;

interface Offer {
    id: string;
    name: string;
    unlockFee: number;
    perMinute: number;
    color: string;
}

const round = (value: number) => Math.round(value * 100) / 100;

/**
 * Four scooter offers as cards. Students pick any two, see them drawn as lines,
 * and read a verdict that changes with the ride length they choose.
 */
export const DealChooser = () => {
    const minutes = useVar("rideMinutes", 4) as number;
    const zipUnlockFee = useVar("zipUnlockFee", 1) as number;
    const zipPerMinute = useVar("zipPerMinute", 0.3) as number;
    const glideUnlockFee = useVar("glideUnlockFee", 3) as number;
    const glidePerMinute = useVar("glidePerMinute", 0.1) as number;
    const setVar = useSetVar();

    const offers: Offer[] = [
        { id: "zip", name: "Zip", unlockFee: zipUnlockFee, perMinute: zipPerMinute, color: "#6366f1" },
        { id: "glide", name: "Glide", unlockFee: glideUnlockFee, perMinute: glidePerMinute, color: "#f97316" },
        { id: "whizz", name: "Whizz", unlockFee: 0, perMinute: 0.4, color: "#10b981" },
        { id: "cruise", name: "Cruise", unlockFee: 5, perMinute: 0.15, color: "#db2777" },
    ];

    const [selectedIds, setSelectedIds] = useState<string[]>(["zip", "whizz"]);

    const toggle = (id: string) => {
        setSelectedIds((current) => {
            if (current.includes(id)) {
                return current.length === 1 ? current : current.filter((item) => item !== id);
            }
            return current.length < 2 ? [...current, id] : [current[1], id];
        });
    };

    const chosen = selectedIds
        .map((id) => offers.find((offer) => offer.id === id))
        .filter((offer): offer is Offer => Boolean(offer));

    const costOf = (offer: Offer, x: number) => offer.unlockFee + offer.perMinute * x;

    let verdict = "Pick a second offer to compare.";
    let crossingMinutes: number | null = null;
    let crossingCost: number | null = null;

    if (chosen.length === 2) {
        const [first, second] = chosen;
        const rateDifference = first.perMinute - second.perMinute;
        if (rateDifference === 0) {
            const cheaper = first.unlockFee <= second.unlockFee ? first : second;
            verdict = `These two charge the same per minute, so they never meet: ${cheaper.name} is cheaper for every ride.`;
        } else {
            const meeting = (second.unlockFee - first.unlockFee) / rateDifference;
            if (meeting > 0 && meeting <= MINUTES_MAX) {
                crossingMinutes = round(meeting);
                crossingCost = round(costOf(first, meeting));
                const shortRideCheaper = costOf(first, meeting / 2) < costOf(second, meeting / 2) ? first : second;
                const longRideCheaper = shortRideCheaper.id === first.id ? second : first;
                verdict = `Up to ${crossingMinutes} minutes, ${shortRideCheaper.name} is cheaper. After ${crossingMinutes} minutes, ${longRideCheaper.name} is cheaper.`;
            } else {
                const cheaper = costOf(first, MINUTES_MAX / 2) < costOf(second, MINUTES_MAX / 2) ? first : second;
                verdict = `These two never meet on this graph: ${cheaper.name} is cheaper for every ride length shown.`;
            }
        }
    }

    const advice = (() => {
        if (chosen.length !== 2) return null;
        const [first, second] = chosen;
        const firstCost = costOf(first, minutes);
        const secondCost = costOf(second, minutes);
        if (Math.abs(firstCost - secondCost) < 0.005) {
            return `For a ${minutes} minute ride there is nothing to choose: both cost £${firstCost.toFixed(2)}.`;
        }
        const cheaper = firstCost < secondCost ? first : second;
        return `For a ${minutes} minute ride, pick ${cheaper.name}: £${Math.min(firstCost, secondCost).toFixed(2)} against £${Math.max(firstCost, secondCost).toFixed(2)}.`;
    })();

    return (
        <div className="w-full rounded-xl border border-slate-200 bg-white p-4">
            {/* offer cards */}
            <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {offers.map((offer) => {
                    const isSelected = selectedIds.includes(offer.id);
                    return (
                        <button
                            key={offer.id}
                            type="button"
                            onClick={() => toggle(offer.id)}
                            className={`rounded-lg border-2 px-3 py-2 text-left transition-colors ${
                                isSelected ? "bg-slate-50" : "border-slate-200 bg-white hover:border-slate-300"
                            }`}
                            style={isSelected ? { borderColor: offer.color } : undefined}
                        >
                            <div
                                className="text-sm font-semibold"
                                style={{ color: isSelected ? offer.color : "#334155" }}
                            >
                                {offer.name}
                            </div>
                            <div className="text-xs text-slate-500">
                                £{offer.unlockFee.toFixed(2)} unlock
                            </div>
                            <div className="text-xs text-slate-500">
                                £{offer.perMinute.toFixed(2)} a minute
                            </div>
                        </button>
                    );
                })}
            </div>

            <svg
                width="100%"
                viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
                role="img"
                aria-label="Cost against minutes ridden for the two chosen scooter offers"
            >
                {/* grid + cost labels */}
                {Array.from({ length: COST_MAX / 2 + 1 }, (_, index) => index * 2).map((cost) => (
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

                {/* chosen offer lines */}
                {chosen.map((offer) => (
                    <g key={`line-${offer.id}`}>
                        <line
                            x1={toX(0)}
                            y1={toY(offer.unlockFee)}
                            x2={toX(MINUTES_MAX)}
                            y2={toY(Math.min(COST_MAX, costOf(offer, MINUTES_MAX)))}
                            stroke={offer.color}
                            strokeWidth={2.5}
                        />
                        <text
                            x={VIEW_WIDTH - 12}
                            y={toY(Math.min(COST_MAX, costOf(offer, MINUTES_MAX))) + 4}
                            textAnchor="end"
                            fontSize={12}
                            fontWeight={600}
                            fill={offer.color}
                        >
                            {offer.name}
                        </text>
                    </g>
                ))}

                {/* meeting point */}
                {crossingMinutes !== null && crossingCost !== null && (
                    <g>
                        <circle cx={toX(crossingMinutes)} cy={toY(crossingCost)} r={6} fill="#0f172a" />
                        <text
                            x={toX(crossingMinutes)}
                            y={toY(crossingCost) - 12}
                            textAnchor="middle"
                            fontSize={11}
                            fontWeight={600}
                            fill="#0f172a"
                        >
                            ({crossingMinutes}, £{crossingCost.toFixed(2)})
                        </text>
                    </g>
                )}

                {/* chosen ride length marker */}
                <line
                    x1={toX(minutes)}
                    y1={PAD_TOP}
                    x2={toX(minutes)}
                    y2={PAD_TOP + PLOT_HEIGHT}
                    stroke="#cbd5e1"
                    strokeWidth={1}
                    strokeDasharray="4 4"
                />
                {chosen.map((offer) => (
                    <circle
                        key={`marker-${offer.id}`}
                        cx={toX(minutes)}
                        cy={toY(costOf(offer, minutes))}
                        r={5}
                        fill={offer.color}
                    />
                ))}
            </svg>

            {/* ride length control */}
            <div className="mt-3">
                <div className="mb-2 text-sm font-semibold text-slate-700">
                    Ride length (x): {minutes} min
                </div>
                <Slider
                    value={[minutes]}
                    min={0}
                    max={MINUTES_MAX}
                    step={1}
                    onValueChange={(value) => setVar("rideMinutes", value[0])}
                />
            </div>

            {/* verdict */}
            <div className="mt-3 space-y-1 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-800">
                <div className="font-semibold">{verdict}</div>
                {advice && <div className="text-slate-600">{advice}</div>}
            </div>
        </div>
    );
};

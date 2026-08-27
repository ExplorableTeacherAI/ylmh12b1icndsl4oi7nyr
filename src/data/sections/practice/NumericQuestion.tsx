import { useState } from "react";
import { Button, EditableParagraph, Input } from "@/components/atoms";

interface NumericQuestionProps {
    /** Id of the Block this question lives in */
    blockId: string;
    /** Unique id used for the editable prompt paragraph */
    questionId: string;
    /** The question the student reads */
    prompt: string;
    /** The correct value */
    answer: number;
    /** How close counts as correct */
    tolerance?: number;
    /** Small label shown before the input, e.g. "£" */
    prefix?: string;
    /** Placeholder inside the input */
    placeholder?: string;
    /** Shown when the answer is right — says why it is right */
    correctMessage: string;
    /** Progressive support: a nudge, then a direction, then the reasoning */
    hints: string[];
}

/**
 * A short answer question with progressive feedback: a nudge first, then a
 * direction back to the visual, and only then the reasoning.
 */
export const NumericQuestion = ({
    blockId,
    questionId,
    prompt,
    answer,
    tolerance = 0.001,
    prefix,
    placeholder = "Your answer",
    correctMessage,
    hints,
}: NumericQuestionProps) => {
    const [entry, setEntry] = useState("");
    const [attempts, setAttempts] = useState(0);
    const [isCorrect, setIsCorrect] = useState(false);
    const [checked, setChecked] = useState(false);

    const check = () => {
        const value = Number(entry.replace(/[^0-9.-]/g, ""));
        const correct = entry.trim() !== "" && Math.abs(value - answer) <= tolerance;
        setIsCorrect(correct);
        setChecked(true);
        if (!correct) setAttempts((count) => Math.min(count + 1, hints.length));
    };

    const hint = hints[Math.max(0, attempts - 1)] ?? hints[hints.length - 1];

    return (
        <div className="w-full rounded-xl border border-slate-200 bg-slate-50/60 p-4">
            <EditableParagraph id={`para-${questionId}`} blockId={blockId}>
                {prompt}
            </EditableParagraph>

            <div className="mt-3 flex flex-wrap items-center gap-2">
                {prefix && <span className="text-sm font-semibold text-slate-600">{prefix}</span>}
                <Input
                    value={entry}
                    onChange={(event) => {
                        setEntry(event.target.value);
                        setChecked(false);
                    }}
                    className="w-32 bg-white"
                    placeholder={placeholder}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") check();
                    }}
                />
                <Button size="sm" onClick={check}>
                    Check
                </Button>
            </div>

            {checked && (
                <div
                    className={`mt-3 rounded-lg border px-3 py-2 text-sm ${
                        isCorrect
                            ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                            : "border-amber-200 bg-amber-50 text-amber-800"
                    }`}
                >
                    {isCorrect ? correctMessage : hint}
                </div>
            )}
        </div>
    );
};

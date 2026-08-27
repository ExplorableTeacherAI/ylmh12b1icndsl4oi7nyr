import { useState } from "react";
import { Button, EditableParagraph, Label, RadioGroup, RadioGroupItem } from "@/components/atoms";

export interface ChoiceOption {
    id: string;
    label: string;
    correct?: boolean;
    /** Feedback shown when this option is chosen */
    feedback: string;
}

interface ChoiceQuestionProps {
    blockId: string;
    questionId: string;
    prompt: string;
    options: ChoiceOption[];
}

/**
 * Multiple choice question where every option carries its own feedback, so a
 * wrong answer is answered on its own terms instead of being simply corrected.
 */
export const ChoiceQuestion = ({ blockId, questionId, prompt, options }: ChoiceQuestionProps) => {
    const [selected, setSelected] = useState<string | null>(null);
    const [checked, setChecked] = useState(false);

    const chosen = options.find((option) => option.id === selected) ?? null;
    const isCorrect = Boolean(chosen?.correct);

    return (
        <div className="w-full rounded-xl border border-slate-200 bg-slate-50/60 p-4">
            <EditableParagraph id={`para-${questionId}`} blockId={blockId}>
                {prompt}
            </EditableParagraph>

            <RadioGroup
                className="mt-3 space-y-2"
                value={selected ?? ""}
                onValueChange={(value) => {
                    setSelected(value);
                    setChecked(false);
                }}
            >
                {options.map((option) => (
                    <div key={option.id} className="flex items-start gap-2">
                        <RadioGroupItem
                            value={option.id}
                            id={`${questionId}-${option.id}`}
                            className="mt-0.5"
                        />
                        <Label
                            htmlFor={`${questionId}-${option.id}`}
                            className="cursor-pointer text-sm font-normal leading-snug text-slate-700"
                        >
                            {option.label}
                        </Label>
                    </div>
                ))}
            </RadioGroup>

            <div className="mt-3">
                <Button size="sm" disabled={!selected} onClick={() => setChecked(true)}>
                    Check
                </Button>
            </div>

            {checked && chosen && (
                <div
                    className={`mt-3 rounded-lg border px-3 py-2 text-sm ${
                        isCorrect
                            ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                            : "border-amber-200 bg-amber-50 text-amber-800"
                    }`}
                >
                    {chosen.feedback}
                </div>
            )}
        </div>
    );
};

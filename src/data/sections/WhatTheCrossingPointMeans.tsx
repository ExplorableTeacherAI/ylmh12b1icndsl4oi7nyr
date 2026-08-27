import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableH3, EditableParagraph } from "@/components/atoms";
import { CrossingPointSentence } from "./visuals/CrossingPointSentence";
import { ChoiceQuestion } from "./practice/ChoiceQuestion";
import { NumericQuestion } from "./practice/NumericQuestion";

export const whatTheCrossingPointMeansBlocks: ReactElement[] = [
    <StackLayout key="layout-crossing-point-heading" maxWidth="xl">
        <Block id="crossing-point-heading" padding="md">
            <EditableH2 id="h2-crossing-point-heading" blockId="crossing-point-heading">
                What the Crossing Point Means
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-crossing-point-reading" maxWidth="xl">
        <Block id="crossing-point-reading" padding="sm">
            <EditableParagraph id="para-crossing-point-reading" blockId="crossing-point-reading">
                Where the two deals meet, one point belongs to both of them at the same time.
                Follow the dashed line down to the minutes axis and across to the pounds axis,
                then use those two numbers to finish the sentence.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-crossing-point-visual" maxWidth="2xl">
        <Block id="crossing-point-visual" padding="sm" hasVisualization>
            <CrossingPointSentence />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-crossing-point-sentence" maxWidth="xl">
        <Block id="crossing-point-sentence" padding="sm">
            <EditableParagraph id="para-crossing-point-sentence" blockId="crossing-point-sentence">
                A crossing point is never just a dot on a graph. It says that for one exact ride
                length the two apps charge the same amount, and either side of it a different
                app is cheaper.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-crossing-point-practice-heading" maxWidth="xl">
        <Block id="crossing-point-practice-heading" padding="sm">
            <EditableH3 id="h3-crossing-point-practice-heading" blockId="crossing-point-practice-heading">
                Your turn
            </EditableH3>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-crossing-point-practice-meaning" maxWidth="xl">
        <Block id="crossing-point-practice-meaning" padding="sm">
            <ChoiceQuestion
                blockId="crossing-point-practice-meaning"
                questionId="crossing-point-practice-meaning"
                prompt="A different problem, same idea: two bowling deals are graphed with games along x and cost up y, and the lines cross at the point (3, 11). What does that point tell you?"
                options={[
                    {
                        id: "same-cost-three-games",
                        label: "For 3 games, both deals cost 11 pounds.",
                        correct: true,
                        feedback:
                            "Yes. The point sits on both lines, so it is the one number of games where the two deals charge exactly the same, and 11 pounds is that shared cost.",
                    },
                    {
                        id: "first-deal-cheaper",
                        label: "The first deal is the cheaper one.",
                        feedback:
                            "That is the belief to watch out for: a crossing point does not crown a winner, it is where the two deals are level. Go back to the graph above and read the point as a pair of numbers — minutes, then money — and say it as a sentence.",
                    },
                    {
                        id: "always-eleven",
                        label: "The bowling always costs 11 pounds.",
                        feedback:
                            "Not quite — 11 pounds is only the cost at that one point. Try the sentence builder above again: the money in the sentence is tied to a particular number of minutes, not to every ride.",
                    },
                    {
                        id: "swapped-coordinates",
                        label: "Both deals cost the same when the price is 3 pounds.",
                        feedback:
                            "The two numbers have swapped roles. In the graph above, check which axis the first number of the point is read from and which axis the second comes from.",
                    },
                ]}
            />
        </Block>
    </StackLayout>,
];

import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableH3, EditableParagraph } from "@/components/atoms";
import { DealToLineBuilder } from "./visuals/DealToLineBuilder";
import { NumericQuestion } from "./practice/NumericQuestion";

export const turningADealIntoALineBlocks: ReactElement[] = [
    <StackLayout key="layout-deal-line-heading" maxWidth="xl">
        <Block id="deal-line-heading" padding="md">
            <EditableH2 id="h2-deal-line-heading" blockId="deal-line-heading">
                Turning a Deal into a Line
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-deal-line-worked-example" maxWidth="xl">
        <Block id="deal-line-worked-example" padding="sm">
            <EditableParagraph id="para-deal-line-worked-example" blockId="deal-line-worked-example">
                Zip charges 1 pound to unlock, then 30p for every minute. So a 4 minute ride
                costs the 1 pound unlock plus 4 lots of 30p: 1 + 1.20 = 2.20 pounds. Work out
                the other rows below, and each cost you reveal drops onto the grid as a point.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-deal-line-visual" maxWidth="2xl">
        <Block id="deal-line-visual" padding="sm" hasVisualization>
            <DealToLineBuilder />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-deal-line-pattern" maxWidth="xl">
        <Block id="deal-line-pattern" padding="sm">
            <EditableParagraph id="para-deal-line-pattern" blockId="deal-line-pattern">
                Every extra minute adds the same 30p, so the points climb by an equal step and
                land in a perfectly straight line. Joined up, that line is the whole deal in one
                picture: pick any ride length on the x-axis, go up to the line, and read the
                cost on the y-axis.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-deal-line-practice-heading" maxWidth="xl">
        <Block id="deal-line-practice-heading" padding="sm">
            <EditableH3 id="h3-deal-line-practice-heading" blockId="deal-line-practice-heading">
                Your turn
            </EditableH3>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-deal-line-practice-cost" maxWidth="xl">
        <Block id="deal-line-practice-cost" padding="sm">
            <NumericQuestion
                blockId="deal-line-practice-cost"
                questionId="deal-line-practice-cost"
                prompt="Your ride home takes 14 minutes on Zip. What does it cost, in pounds?"
                answer={5.2}
                tolerance={0.01}
                prefix="£"
                placeholder="e.g. 4.50"
                correctMessage="Correct — £5.20. You paid the 1 pound unlock once, then 14 lots of 30p on top, which is why every extra minute pushes the point further up the line."
                hints={[
                    "Not quite. There are two separate charges here — did you include both?",
                    "Try this: in the table above, reveal the 10 minute cost. Then add four more minutes of charge to it.",
                    "Work it out as 1 + 14 × 0.30. The unlock fee is paid once, the 30p is paid 14 times.",
                ]}
            />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-deal-line-practice-minutes" maxWidth="xl">
        <Block id="deal-line-practice-minutes" padding="sm">
            <NumericQuestion
                blockId="deal-line-practice-minutes"
                questionId="deal-line-practice-minutes"
                prompt="A Zip ride cost 3.10 pounds. How many minutes was it?"
                answer={7}
                tolerance={0.01}
                placeholder="minutes"
                correctMessage="Correct — 7 minutes. You worked backwards: take off the 1 pound unlock, then see how many 30p minutes fit into what is left."
                hints={[
                    "Not quite. This time you know the cost and need the minutes, so work backwards.",
                    "Try this: on the graph above, find 3.10 pounds on the y-axis and slide across to the line, then read down to the x-axis.",
                    "Take the 1 pound unlock off first, leaving 2.10 pounds of minute charges. How many 30p charges make 2.10 pounds?",
                ]}
            />
        </Block>
    </StackLayout>,
];

import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableH3, EditableParagraph } from "@/components/atoms";
import { SlideAlongDealLine } from "./visuals/SlideAlongDealLine";
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
                costs the 1 pound unlock plus 4 lots of 30p: 1 + 1.20 = 2.20 pounds. Slide the
                marker below to check other ride lengths for yourself.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-deal-line-visual" maxWidth="2xl">
        <Block id="deal-line-visual" padding="sm" hasVisualization>
            <SlideAlongDealLine />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-deal-line-pattern" maxWidth="xl">
        <Block id="deal-line-pattern" padding="sm">
            <EditableParagraph id="para-deal-line-pattern" blockId="deal-line-pattern">
                Every extra minute adds the same 30p, so the costs climb by an equal step and
                the whole deal becomes one straight line. It reads both ways: from a ride length
                across to a cost, or from a cost back to the ride length that produced it.
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
                prompt="Your ride home takes 14 minutes, which runs off the end of the graph. What does it cost on Zip, in pounds?"
                answer={5.2}
                tolerance={0.01}
                prefix="£"
                placeholder="e.g. 4.50"
                correctMessage="Correct — £5.20. You paid the 1 pound unlock once and 30p fourteen times, which is why the line keeps climbing at the same rate past the edge of the graph."
                hints={[
                    "Not quite. There are two separate charges here — did you include both?",
                    "Try this: slide the marker to 12 minutes and read the cost, then carry the pattern on for two more minutes.",
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
                prompt="A Zip ride cost 5.50 pounds. How many minutes was it?"
                answer={15}
                tolerance={0.01}
                placeholder="minutes"
                correctMessage="Correct — 15 minutes. You worked backwards: take off the 1 pound unlock, then count how many 30p minutes fit into what is left."
                hints={[
                    "Not quite. This time you know the cost and need the minutes, so work backwards.",
                    "Try this: on the graph, slide the marker until the cost readout passes 4 pounds, and notice how you are reading a cost back to a ride length.",
                    "Take the 1 pound unlock off first, leaving 4.50 pounds of minute charges. How many 30p charges make 4.50 pounds?",
                ]}
            />
        </Block>
    </StackLayout>,
];

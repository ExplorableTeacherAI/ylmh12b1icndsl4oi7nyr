import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableParagraph } from "@/components/atoms";
import { VisualOptionCards } from "@/components/organisms";

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
                Zip charges 1 pound to unlock, then 30p for every minute. A 4 minute ride costs
                the 1 pound unlock plus 4 lots of 30p, so 1 + 1.20 = 2.20 pounds. A 6 minute
                ride costs 1 + 1.80 = 2.80 pounds.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-deal-line-visual" maxWidth="xl">
        <Block id="deal-line-visual" padding="sm">
            <VisualOptionCards
                blockId="deal-line-visual"
                intro="Pick how your students will see one deal become a straight line."
                cards={[
                    {
                        id: "table-to-points",
                        title: "A cost table that fills in row by row and drops each row onto the axes as a point",
                        looks: "A small table of ride lengths and costs beside a grid with minutes across and pounds up. Each completed row appears on the grid as a dot.",
                        manipulate: "Students choose a ride length and work the cost out step by step before the point appears",
                        reveals: "Every cost from the same deal lands on one straight line, so the whole deal fits in a single picture",
                        recommended: true,
                    },
                    {
                        id: "minute-by-minute-builder",
                        title: "A ride timer students step forward one minute at a time while the cost grows",
                        looks: "A running total that starts at the unlock fee, with a growing trail of dots on the axes as the minutes tick up.",
                        manipulate: "Students press a button to add one more minute and watch the total change",
                        reveals: "The same amount is added for every extra minute, which is exactly what makes the picture a straight line",
                    },
                    {
                        id: "fee-and-rate-parts",
                        title: "The unlock fee and the per-minute charge shown as two stacked parts of the cost",
                        looks: "A cost bar in two colours: a fixed block for the unlock fee and a growing block for the minutes, drawn next to the axes.",
                        manipulate: "Students drag the ride length and watch which part of the bar changes and which stays put",
                        reveals: "One part of the cost never changes and one part grows steadily with the ride length",
                    },
                ]}
            />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-deal-line-pattern" maxWidth="xl">
        <Block id="deal-line-pattern" padding="sm">
            <EditableParagraph id="para-deal-line-pattern" blockId="deal-line-pattern">
                Every extra minute adds the same 30p, so the costs climb in a steady, even
                pattern. That steadiness is what makes the deal a straight line rather than a
                curve. So what happens when a second deal joins the same grid?
            </EditableParagraph>
        </Block>
    </StackLayout>,
];

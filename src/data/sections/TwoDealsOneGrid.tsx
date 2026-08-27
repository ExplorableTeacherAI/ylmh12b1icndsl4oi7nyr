import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableParagraph } from "@/components/atoms";
import { VisualOptionCards } from "@/components/organisms";

export const twoDealsOneGridBlocks: ReactElement[] = [
    <StackLayout key="layout-two-deals-heading" maxWidth="xl">
        <Block id="two-deals-heading" padding="md">
            <EditableH2 id="h2-two-deals-heading" blockId="two-deals-heading">
                Two Deals, One Grid
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-two-deals-setup" maxWidth="xl">
        <Block id="two-deals-setup" padding="sm">
            <EditableParagraph id="para-two-deals-setup" blockId="two-deals-setup">
                Glide charges 3 pounds to unlock, then only 10p a minute. For a 4 minute ride
                that is 3 + 0.40 = 3.40 pounds, while Zip is 2.20 pounds. For a 20 minute ride
                Glide is 3 + 2.00 = 5.00 pounds, while Zip is 1 + 6.00 = 7.00 pounds.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-two-deals-switch" maxWidth="xl">
        <Block id="two-deals-switch" padding="sm">
            <EditableParagraph id="para-two-deals-switch" blockId="two-deals-switch">
                Zip is cheaper for the short ride and Glide is cheaper for the long one, so the
                answer flips somewhere in between. Both deals use the same x and the same y, so
                they belong on the same grid.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-two-deals-visual" maxWidth="xl">
        <Block id="two-deals-visual" padding="sm">
            <VisualOptionCards
                blockId="two-deals-visual"
                intro="Pick how your students will compare the two deals side by side."
                cards={[
                    {
                        id: "two-lines-one-grid",
                        title: "Both deals drawn as two coloured lines on one set of axes",
                        looks: "Minutes across, pounds up, with one line for each app in its own colour and the two lines meeting at a single point.",
                        manipulate: "Students move a marker along the minutes axis and read both costs at that ride length",
                        reveals: "The cheaper deal is simply the lower line, and which line is lower changes partway along",
                        recommended: true,
                    },
                    {
                        id: "cost-difference-tracker",
                        title: "The two lines plus a bar showing how far apart the costs are",
                        looks: "The two deal lines with a vertical gap drawn between them, and a bar that shrinks and grows as the ride length changes.",
                        manipulate: "Students drag the ride length and watch the gap between the deals close and reopen",
                        reveals: "The saving shrinks to nothing at one particular ride length and then grows the other way",
                    },
                    {
                        id: "side-by-side-table-and-graph",
                        title: "A cost table for both apps beside the graph, row highlighted as students scan down",
                        looks: "A two-column table of costs for a list of ride lengths, next to the two lines on the axes.",
                        manipulate: "Students step down the table and see the matching pair of points light up on the graph",
                        reveals: "The row where the two costs swap over is the same place the lines meet",
                    },
                ]}
            />
        </Block>
    </StackLayout>,
];

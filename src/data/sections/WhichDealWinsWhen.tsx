import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableParagraph } from "@/components/atoms";
import { VisualOptionCards } from "@/components/organisms";

export const whichDealWinsWhenBlocks: ReactElement[] = [
    <StackLayout key="layout-which-deal-heading" maxWidth="xl">
        <Block id="which-deal-heading" padding="md">
            <EditableH2 id="h2-which-deal-heading" blockId="which-deal-heading">
                Which Deal Wins When?
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-which-deal-setup" maxWidth="xl">
        <Block id="which-deal-setup" padding="sm">
            <EditableParagraph id="para-which-deal-setup" blockId="which-deal-setup">
                Prices change. Suppose Glide drops its unlock fee, or Zip raises its charge per
                minute. The two deals still meet somewhere, but not at the same ride length as
                before.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-which-deal-visual" maxWidth="xl">
        <Block id="which-deal-visual" padding="sm">
            <VisualOptionCards
                blockId="which-deal-visual"
                intro="Pick how your students will test what happens when the prices change."
                cards={[
                    {
                        id: "price-controls",
                        title: "Sliders for each app's unlock fee and per-minute charge, with the meeting point moving live",
                        looks: "Four price controls beside the two deal lines, with the meeting point and its two values updating as prices change.",
                        manipulate: "Students set new prices and watch the meeting point slide along the grid",
                        reveals: "The unlock fee and the per-minute charge move the meeting point in different ways",
                        recommended: true,
                    },
                    {
                        id: "deal-cards-chooser",
                        title: "A set of offer cards students pick from, with the advice updating each time",
                        looks: "Three or four scooter offers on cards, the chosen pair drawn as lines, and a short verdict about which is cheaper for short and long rides.",
                        manipulate: "Students pick any two offers to compare and choose one for a given ride length",
                        reveals: "Whether a deal is a good one depends entirely on how long the ride is",
                    },
                    {
                        id: "parallel-case",
                        title: "A challenge where the prices can be set so the two lines never meet",
                        looks: "The same two deal lines with price controls and a note that appears when no meeting point exists.",
                        manipulate: "Students hunt for prices where the deals never cost the same",
                        reveals: "If both apps charge the same per minute, one deal is cheaper forever and there is no crossing point",
                    },
                ]}
            />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-which-deal-decision" maxWidth="xl">
        <Block id="which-deal-decision" padding="sm">
            <EditableParagraph id="para-which-deal-decision" blockId="which-deal-decision">
                Once you know where the deals meet, the decision is easy: work out roughly how
                long you ride, then pick whichever app is cheaper on that side of the meeting
                point.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];

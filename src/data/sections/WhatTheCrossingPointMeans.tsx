import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableParagraph } from "@/components/atoms";
import { VisualOptionCards } from "@/components/organisms";

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
                Its x-value is a number of minutes and its y-value is an amount of money. Read
                both, and you can say what that point means in the scooter story.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-crossing-point-visual" maxWidth="xl">
        <Block id="crossing-point-visual" padding="sm">
            <VisualOptionCards
                blockId="crossing-point-visual"
                intro="Pick how your students will work out what the meeting point is telling them."
                cards={[
                    {
                        id: "sentence-builder",
                        title: "The meeting point with a fill-in-the-blank sentence about minutes and money",
                        looks: "The two deal lines with their meeting point marked, and a sentence underneath with two gaps waiting to be filled.",
                        manipulate: "Students drag the x-value and the y-value from the point into the sentence and check it",
                        reveals: "The point means both apps cost exactly the same at that one ride length, said in plain words",
                        targetsMisconception: "Students cannot say what the crossing point actually means in the story",
                        recommended: true,
                    },
                    {
                        id: "receipt-check",
                        title: "Two scooter receipts that match only at the meeting point",
                        looks: "A receipt for each app showing its unlock fee and minute charge, beside the two lines on the axes.",
                        manipulate: "Students slide the ride length and watch the two totals move apart, match, then swap over",
                        reveals: "The meeting point is the one ride length where the two receipts read the same total",
                        targetsMisconception: "Students cannot say what the crossing point actually means in the story",
                    },
                    {
                        id: "before-after-shading",
                        title: "The grid shaded to show which app is cheaper on each side of the meeting point",
                        looks: "The two lines with the region before the meeting point shaded in one app's colour and the region after it in the other's.",
                        manipulate: "Students tap a ride length on either side and name the cheaper app",
                        reveals: "The meeting point is the moment the cheaper app changes, not simply where the answer is",
                    },
                ]}
            />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-crossing-point-sentence" maxWidth="xl">
        <Block id="crossing-point-sentence" padding="sm">
            <EditableParagraph id="para-crossing-point-sentence" blockId="crossing-point-sentence">
                A crossing point is never just a dot on a graph. It says that for one exact ride
                length, the two apps charge the same amount, and either side of it a different
                app is cheaper. If you cannot say that as a sentence about minutes and money,
                you have not finished reading it.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];

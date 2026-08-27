import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableH3, EditableParagraph } from "@/components/atoms";
import { TwoDealsGapTracker } from "./visuals/TwoDealsGapTracker";
import { NumericQuestion } from "./practice/NumericQuestion";

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
                Zip wins the short ride and Glide wins the long one. Both deals use the same x
                and the same y, so drag the ride length below and watch the gap between them.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-two-deals-visual" maxWidth="2xl">
        <Block id="two-deals-visual" padding="sm" hasVisualization>
            <TwoDealsGapTracker />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-two-deals-gap-closes" maxWidth="xl">
        <Block id="two-deals-gap-closes" padding="sm">
            <EditableParagraph id="para-two-deals-gap-closes" blockId="two-deals-gap-closes">
                Somewhere in the middle the gap shrinks to nothing, and then it opens again the
                other way round. That one moment is where the two lines touch.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-two-deals-practice-heading" maxWidth="xl">
        <Block id="two-deals-practice-heading" padding="sm">
            <EditableH3 id="h3-two-deals-practice-heading" blockId="two-deals-practice-heading">
                Your turn
            </EditableH3>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-two-deals-practice-short-ride" maxWidth="xl">
        <Block id="two-deals-practice-short-ride" padding="sm">
            <NumericQuestion
                blockId="two-deals-practice-short-ride"
                questionId="two-deals-practice-short-ride"
                prompt="You ride for 8 minutes. How many pounds cheaper is the better app for that ride?"
                answer={0.4}
                tolerance={0.01}
                prefix="£"
                placeholder="e.g. 0.60"
                correctMessage="Correct — 40p, and Zip is the cheaper one. Zip's small unlock fee still outweighs its higher charge per minute over a ride this short."
                hints={[
                    "Not quite. Work out both costs for 8 minutes first, then subtract the smaller from the larger.",
                    "Try this: set the ride length above to 8 minutes and read the two costs, then check the gap bar.",
                    "Zip is 1 + 8 × 0.30 = 3.40 and Glide is 3 + 8 × 0.10 = 3.80. The difference is what you want.",
                ]}
            />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-two-deals-practice-long-ride" maxWidth="xl">
        <Block id="two-deals-practice-long-ride" padding="sm">
            <NumericQuestion
                blockId="two-deals-practice-long-ride"
                questionId="two-deals-practice-long-ride"
                prompt="Now you ride for 16 minutes. How many pounds cheaper is the better app this time?"
                answer={1.2}
                tolerance={0.01}
                prefix="£"
                placeholder="e.g. 0.90"
                correctMessage="Correct — 1.20 pounds, and now Glide is the cheaper one. Over 16 minutes Zip's 30p a minute piles up faster than Glide's larger unlock fee."
                hints={[
                    "Not quite. Which app is ahead has changed since the 8 minute ride — check both costs again.",
                    "Try this: slide the ride length above from 8 up to 16 and watch the gap bar shrink, vanish, then grow again.",
                    "Zip is 1 + 16 × 0.30 = 5.80 and Glide is 3 + 16 × 0.10 = 4.60. Subtract to find the gap.",
                ]}
            />
        </Block>
    </StackLayout>,
];

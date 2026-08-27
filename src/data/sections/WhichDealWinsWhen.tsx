import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableH3, EditableParagraph } from "@/components/atoms";
import { DealChooser } from "./visuals/DealChooser";
import { NumericQuestion } from "./practice/NumericQuestion";

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
                There are more than two scooter apps in town. Pick any two offers below, and the
                graph draws them both; then set a ride length and see which one you should
                actually tap.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-which-deal-visual" maxWidth="2xl">
        <Block id="which-deal-visual" padding="sm" hasVisualization>
            <DealChooser />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-which-deal-decision" maxWidth="xl">
        <Block id="which-deal-decision" padding="sm">
            <EditableParagraph id="para-which-deal-decision" blockId="which-deal-decision">
                So the decision is easy once you know where the two offers meet: judge roughly
                how long you ride, then take whichever app is cheaper on that side of the
                meeting point. Some pairs never meet at all, and then one app wins every time.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-which-deal-practice-heading" maxWidth="xl">
        <Block id="which-deal-practice-heading" padding="sm">
            <EditableH3 id="h3-which-deal-practice-heading" blockId="which-deal-practice-heading">
                Your turn
            </EditableH3>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-which-deal-practice-six-minutes" maxWidth="xl">
        <Block id="which-deal-practice-six-minutes" padding="sm">
            <NumericQuestion
                blockId="which-deal-practice-six-minutes"
                questionId="which-deal-practice-six-minutes"
                prompt="You have a 6 minute ride and you are choosing between Whizz and Zip. What does the cheaper of the two cost, in pounds?"
                answer={2.4}
                tolerance={0.01}
                prefix="£"
                placeholder="e.g. 3.00"
                correctMessage="Correct — Whizz at 2.40 pounds. With no unlock fee to pay, Whizz stays ahead on short rides even though it charges the most per minute."
                hints={[
                    "Not quite. Work out both costs for a 6 minute ride, then give the smaller one.",
                    "Try this: select Whizz and Zip on the cards above and set the ride length to 6 minutes, then read the verdict.",
                    "Whizz is 0 + 6 × 0.40 = 2.40 and Zip is 1 + 6 × 0.30 = 2.80, so the cheaper cost is 2.40 pounds.",
                ]}
            />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-which-deal-practice-stretch" maxWidth="xl">
        <Block id="which-deal-practice-stretch" padding="sm">
            <NumericQuestion
                blockId="which-deal-practice-stretch"
                questionId="which-deal-practice-stretch"
                prompt="A stretch: Cruise costs 5 pounds to unlock plus 15p a minute, and Whizz is free to unlock but 40p a minute. After how many minutes does Cruise become the cheaper choice?"
                answer={20}
                tolerance={0.2}
                placeholder="minutes"
                correctMessage="Correct — after 20 minutes. Whizz gains 40p a minute on Cruise's 15p, so its 25p-a-minute head start eats up Cruise's 5 pound unlock fee in exactly 20 minutes."
                hints={[
                    "Not quite. Cruise starts 5 pounds behind, so ask how quickly Whizz's higher per-minute charge closes that gap.",
                    "Try this: select Cruise and Whizz on the cards above and slide the ride length until the two lines meet, then read the minutes.",
                    "Each minute, Whizz charges 40p and Cruise only 15p, a difference of 25p. It takes 5.00 ÷ 0.25 = 20 minutes to wipe out the 5 pound unlock fee.",
                ]}
            />
        </Block>
    </StackLayout>,
];

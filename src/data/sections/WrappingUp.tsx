import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableParagraph } from "@/components/atoms";

export const wrappingUpBlocks: ReactElement[] = [
    <StackLayout key="layout-wrapping-up-heading" maxWidth="xl">
        <Block id="wrapping-up-heading" padding="md">
            <EditableH2 id="h2-wrapping-up-heading" blockId="wrapping-up-heading">
                Wrapping Up
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-wrapping-up-summary" maxWidth="xl">
        <Block id="wrapping-up-summary" padding="sm">
            <EditableParagraph id="para-wrapping-up-summary" blockId="wrapping-up-summary">
                So the awkward question you started with turned out to have a picture. Each
                scooter deal is a straight line, x counts the minutes, y counts the pounds, and
                the point where the lines meet is the one ride length where the two apps charge
                exactly the same.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-wrapping-up-next" maxWidth="xl">
        <Block id="wrapping-up-next" padding="sm">
            <EditableParagraph id="para-wrapping-up-next" blockId="wrapping-up-next">
                That is the real payoff: you no longer have to guess which offer is better,
                because the crossing point tells you exactly where the answer flips. The same
                trick compares phone plans, gym memberships and delivery fees. Next, you will
                find that meeting point with algebra alone, without drawing anything.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];

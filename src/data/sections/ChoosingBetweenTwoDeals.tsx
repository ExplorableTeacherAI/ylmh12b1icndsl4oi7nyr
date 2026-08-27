import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH1, EditableParagraph } from "@/components/atoms";

export const choosingBetweenTwoDealsBlocks: ReactElement[] = [
    <StackLayout key="layout-choosing-deals-title" maxWidth="xl">
        <Block id="choosing-deals-title" padding="md">
            <EditableH1 id="h1-choosing-deals-title" blockId="choosing-deals-title">
                Choosing Between Two Deals
            </EditableH1>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-choosing-deals-hook" maxWidth="xl">
        <Block id="choosing-deals-hook" padding="sm">
            <EditableParagraph id="para-choosing-deals-hook" blockId="choosing-deals-hook">
                Two scooter apps sit on your phone. Zip charges a small unlock fee and then a
                little for every minute you ride. Glide charges a bigger unlock fee but less
                per minute. So which one is cheaper? It depends on how long you ride.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-choosing-deals-promise" maxWidth="xl">
        <Block id="choosing-deals-promise" padding="sm">
            <EditableParagraph id="para-choosing-deals-promise" blockId="choosing-deals-promise">
                In this lesson you will settle that question with a graph, using x for the
                minutes you ride and y for the cost in pounds. You already know how to plot
                points and read values off a straight line, and that is all you need. Two deals
                become two lines, and the place where they cross tells you which app to pick.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];

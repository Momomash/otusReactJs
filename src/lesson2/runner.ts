import {ParsedLineType, parser} from "./parser";

import {firstPrioritiesCalc, secondPrioritiesCalc} from "./engine";
import {isBracketClose, isBracketOpen} from "./helpers";

const calculate = (stack: ParsedLineType): number => {
    const firstPrioritiesRes = firstPrioritiesCalc(stack);
    if (firstPrioritiesRes.length === 1) {
        return Number(firstPrioritiesRes[0]);
    }
    return secondPrioritiesCalc(firstPrioritiesRes);
};

export const runner = (line: string): number => {
    const stack = parser(line);

    if (stack === null) {
        throw new TypeError("Unexpected string");
    }
    let openBraskedPositions: number[] = [];

    for (let i = 0; i < stack.length; i++) {
        if (isBracketOpen(String(stack[i]))) {
            openBraskedPositions.push(i);
        } else if (isBracketClose(String(stack[i]))) {
            let openBraskedPosition = openBraskedPositions.pop() || 0;
            let arr = stack.splice(openBraskedPosition + 1, i - openBraskedPosition);
            stack.splice(openBraskedPosition, 1, calculate(arr));
            i = openBraskedPosition;
        }
    }

    return calculate(stack)
};

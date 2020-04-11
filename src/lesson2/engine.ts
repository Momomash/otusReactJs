import {ParsedLineType} from "./parser";
import {isNumber} from "./helpers";
import {
    binarOperators,
    unarOperators,
    mathPriorities,
    mathOperatorsPriorities,
} from "./mathOperators";

const [FIRST, SECOND] = mathPriorities;

export const firstPrioritiesCalc = (stack: ParsedLineType): ParsedLineType =>
    stack.reduce<ParsedLineType>((result, item) => {
        const prevPrevItem = result[result.length - 2];
        const prevItem = result[result.length - 1];
        if (unarOperators[item]) {
            result = [
                ...result.slice(0, -1),
                unarOperators[item](Number(prevItem)),
            ];
        } else
        if (!isNumber(String(prevItem)) && mathOperatorsPriorities[prevItem] === FIRST) {
            if (!binarOperators[prevItem]) {
                throw new TypeError("Unexpected stack!");
            }
            result = [
                ...result.slice(0, -2),
                binarOperators[prevItem](Number(prevPrevItem), Number(item)),
            ];
        } else {
            result.push(item);
        }
        return result;
    }, []);


export const secondPrioritiesCalc = (stack: ParsedLineType): number =>
    stack.reduce<number>((result, nextItem, key) => {
        const item = stack[key - 1];

        if (mathOperatorsPriorities[item] === FIRST) {
            throw new TypeError("Unexpected stack!");
        }

        if (!isNumber(String(item)) && mathOperatorsPriorities[item] === SECOND) {
            result = binarOperators[item](Number(result), Number(nextItem));
        }
        return result;
    }, Number(stack[0]));

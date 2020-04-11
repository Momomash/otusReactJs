import {isNumber} from "./helpers";
import {
    binarOperators,
    unarOperators
} from "./mathOperators";

export type ParsedLineType = (number | string)[];

export const parser = (line: string): ParsedLineType | null => {
    const stack = line.split(" ");

    return stack.reduce<ParsedLineType>((result, item, key) => {
        const prevItem = stack[key - 1];

        const isValidNumberPush = (!prevItem || binarOperators.hasOwnProperty(prevItem)) && isNumber(item);
        const isValidOperatorPush =
            (isNumber(prevItem) || unarOperators.hasOwnProperty(prevItem) )&&
            binarOperators.hasOwnProperty(item);
        const isValidUnarOperatorPush =
            isNumber(prevItem) &&
            !isNumber(item) &&
            unarOperators.hasOwnProperty(item);

        if (isValidNumberPush) {
            result.push(Number(item));
        } else if (isValidOperatorPush || isValidUnarOperatorPush) {
            result.push(item);
        } else {
            throw new TypeError("Unexpected string");
        }
        return result;
    }, []);
};

import {
    isNumber,
    isBracketOpen,
    isBracketClose,
    isBinar,
    isUnar,
    isFunction,
    likeNumber,
    likeOperator
} from "./helpers";


export type ParsedLineType = (number | string)[];

export const parser = (line: string): ParsedLineType | null => {
    const stack = line.split(" ");
    let BracketOpenCount = 0;
    let BracketCloseCount = 0;

    const parsedStack = stack.reduce<ParsedLineType>((result, item, key) => {

        const prevItem = stack[key - 1];
        const isValidNumberPush = likeOperator(prevItem) && isNumber(item);
        const isValidBinarOperatorPush = likeNumber(prevItem) && isBinar(item);
        const isValidUnarOperatorPush = likeNumber(prevItem) && isUnar(item);
        const isValidFunctionPush = likeOperator(prevItem) && isFunction(item);
        const isValidBracketOpenPush = likeOperator(prevItem) && isBracketOpen(item);
        const isValidBracketClosePush = likeNumber(prevItem) && isBracketClose(item);

        if (isValidNumberPush) {
            result.push(Number(item));
        } else if (isValidBinarOperatorPush || isValidUnarOperatorPush) {
            result.push(item);
        } else if (isValidFunctionPush) {
            let arr = item.split('(');

            let number = arr[1].slice(0, -1);
            result.push(Number(number));
            result.push(arr[0]);
        } else if (isValidBracketOpenPush) {
            result.push(item);
            BracketOpenCount++;
        } else if (isValidBracketClosePush) {
            result.push(item);
            BracketCloseCount++;
        } else {
            throw new TypeError("Unexpected string");
        }
        return result;
    }, []);
    if (BracketOpenCount !== BracketCloseCount) {
        throw new TypeError("Unexpected string");
    }
    return parsedStack;


};


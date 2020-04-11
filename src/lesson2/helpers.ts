import {binarOperators, UnarOperationType, unarOperators} from "./mathOperators";

export const isNumber = (item: string): boolean => !isNaN(Number(item));

export const isBracketOpen = (item: string): boolean => {
    return item === "(";
};

export const isBracketClose = (item: string): boolean => {
    return item === ")";
};

export const isUnar = (item: string): boolean => {
    return unarOperators.hasOwnProperty(item);
};

export const isBinar = (item: string): boolean => {
    return binarOperators.hasOwnProperty(item);
};

export const isFunction = (item: string): boolean => {
    if (!item){
        return false;
    }
    for (let key in unarOperators) {
        if (item.indexOf(key) === 0){
            return true;
        }
    }
    return false;
};

export const likeNumber = (item: string): boolean => {
    return isUnar(item) || isBracketClose(item) || isNumber(item) || isFunction(item);
};

export const likeOperator = (item: string): boolean => {
    return isBinar(item) || isBracketOpen(item) || !item
};

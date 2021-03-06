export type ScalarOperationType = (first: number, second: number) => number;

export type UnarOperationType = (first: number) => number;

//Unar Operators

export const fac: UnarOperationType = (first: number): number => {
    return first ? first * fac(first - 1) : 1;
};

export const squ: UnarOperationType = (
    first: number
): number => first * first;

export const sin: UnarOperationType = (first: number): number => {
    return Math.sin(first);
};
export const cos: UnarOperationType = (first: number): number => {
    return Math.cos(first);
};
export const tan: UnarOperationType = (first: number): number => {
    return Math.tan(first);
};

//ScalarOperators

export const exp: ScalarOperationType = (first: number, second: number): number => {
    let result = first;
    for (let i = 1; i < second; i++) {
        result *= first;
    }
    return result;
};

export const mul: ScalarOperationType = (
    first: number,
    second: number
): number => first * second;

export const div: ScalarOperationType = (
    first: number,
    second: number
): number => first / second;

export const add: ScalarOperationType = (
    first: number,
    second: number
): number => first + second;

export const minus: ScalarOperationType = (
    first: number,
    second: number
): number => first - second;

export const binarOperators: { [key: string]: ScalarOperationType } = {
    "^": exp,
    "*": mul,
    "/": div,
    "+": add,
    "-": minus,
};

export const unarOperators: { [key: string]: UnarOperationType } = {
    "!": fac,
    "**": squ,
    "sin":sin,
    "cos":cos,
    "tan":tan,
};

export const mathPriorities: number[] = [1, 2];

const [FIRST, SECOND] = mathPriorities;

export const mathOperatorsPriorities: { [key: string]: number } = {
    "sin":FIRST,
    "cos":FIRST,
    "tan":FIRST,
    "!": FIRST,
    "^": FIRST,
    "**": FIRST,
    "*": FIRST,
    "/": FIRST,
    "+": SECOND,
    "-": SECOND,
};

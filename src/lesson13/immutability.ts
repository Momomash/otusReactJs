// Задание 1

export type OriginalTeam = {
    size: number;
    name: string;
    league: string;
};

export type ExpectedTeam = {
    name: string;
    league: string;
    roster: number;
};
export type MergedTeams = {
    size: number;
    name: string;
    league: string;
    roster: number;
};

export const mergeTeams = (originalTeam: OriginalTeam, secondTeam: ExpectedTeam): MergedTeams => {
    return Object.assign({}, originalTeam, secondTeam);
};

// Задание 2
type SomeArray = Array<number | string>;

export const originalArrayToExpectedArray = (
    originalArray: SomeArray,
    expectedArray: SomeArray,
): SomeArray => {
    const newArray = [];
    for (let i = 0; i < originalArray.length; i++) {
        newArray[i] = originalArray[i] != expectedArray[i] ? expectedArray[i] : originalArray[i];
    }
    return newArray;
};

// Задание 3

export type Team = {
    name: string;
    captain: {
        name: string;
        age: number;
    };
};

export const originalTeamToExpectedTeam = (originalTeam: Team, expectedTeam: Team): any => {
    const deepClone = (originalTeam: any, expectedTeam: any): any => {
        const clObj: any = {};
        for (const key in originalTeam) {
            if (originalTeam[key] instanceof Object) {
                clObj[key] = deepClone(originalTeam[key], expectedTeam[key]);
                continue;
            }
            clObj[key] = expectedTeam[key];
        }
        return clObj;
    };
    return deepClone(originalTeam, expectedTeam);
};

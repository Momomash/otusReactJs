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
    return originalArray.map(function (item, i) {
        return item != expectedArray[i] ? expectedArray[i] : item;
    });
};

// Задание 3

export type Team = {
    name: string;
    captain: {
        name: string;
        age: number;
    };
};
export type TeamObject = {[index: string]:any};
export const originalTeamToExpectedTeam = (
    originalTeam: TeamObject,
    expectedTeam: TeamObject,
): TeamObject => {
    const clObj: TeamObject = {};
    for (const key in originalTeam) {
        if (originalTeam[key] instanceof Object) {
            clObj[key] = originalTeamToExpectedTeam(originalTeam[key], expectedTeam[key]);
            continue;
        }
        clObj[key] = expectedTeam[key];
    }
    return clObj;
};

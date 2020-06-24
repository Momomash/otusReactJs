import {
    OriginalTeam,
    ExpectedTeam,
    MergedTeams,
    mergeTeams,
    originalTeamToExpectedTeam,
    originalArrayToExpectedArray,
} from './immutability';

// Задание 1
test('team to team', () => {
    const originalTeam: OriginalTeam = Object.freeze({
        size: 15,
        name: 'Tampa Bay Roosters',
        league: 'Minor',
    });
    const secondTeam: ExpectedTeam = {
        name: 'New York Badgers',
        league: 'Minor',
        roster: 25,
    };
    const expectedTeam: MergedTeams = {
        league: 'Minor',
        name: 'New York Badgers',
        roster: 25,
        size: 15,
    };
    expect(mergeTeams(originalTeam, secondTeam)).toEqual(expectedTeam);
});

// Задание 2
test('array to array', () => {
    const originalArray = Object.freeze([1, 2, 3, 4]);

    const expectedArray = ['two', 3, 4, 5];

    expect(originalArrayToExpectedArray(originalArray, expectedArray)).toStrictEqual(expectedArray);
});

// Задание 3
test('team to team deep', () => {
    const originalTeam = Object.freeze({
        name: 'Tampa Bay Roosters',
        captain: {
            name: 'Bryan Downey',
            age: 27,
        },
    });

    const expectedTeam = {
        name: 'Tampa Bay Roosters',
        captain: {
            name: 'Bryan Downey',
            age: 28,
        },
    };

    expect(originalTeamToExpectedTeam(originalTeam, expectedTeam)).toStrictEqual(expectedTeam);
});

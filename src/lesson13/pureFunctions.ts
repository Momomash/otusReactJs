// Задание 1
export type Team = { name: string; score: number };

export const getTopName = (teams: Team[]): string => {
    const result = teams.reduce(
        (max, current) => {
            return current.score > max.score ? current : max;
        },
        { name: '', score: 0 },
    );
    return result.name;
};

//Задание 2
export type QsObj = Record<string, string | number | boolean | object>;

export const createQs = (qsObj: QsObj): string => {
    const keys = Object.keys(qsObj);
    const couples = keys.map(function (elem) {
        return elem + '=' + qsObj[elem];
    });
    let result = '?';
    result += couples.join('&');
    return result;
};

//Задание 3

export const parseQs = (qs: string): QsObj => {
    const noQuestionString = qs.substr(1);
    const couples = noQuestionString.split('&');
    return couples.reduce((obj: QsObj, current) => {
        const couple = current.split('=');
        obj[couple[0]] = couple[1];
        return obj;
    }, {});
};

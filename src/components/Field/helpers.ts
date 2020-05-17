import { CellStatus } from './components/Cell';

export const randomFilling = (arr: Array<Array<CellStatus>>, fullness: number): void => {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            arr[i][j] = CellStatus.Empty;
        }
    }

    let randomCells = Math.round((arr.length * arr[0].length * fullness) / 100);
    for (randomCells; randomCells > 0; randomCells--) {
        const randomRow = arr[Math.floor(Math.random() * arr.length)];
        const randomCol = Math.floor(Math.random() * randomRow.length);
        randomRow[randomCol] = CellStatus.Young;
    }
};
export const generateCells = (x: number, y: number, fullness: number): Array<Array<CellStatus>> => {
    const arr: Array<Array<CellStatus>> = [];
    for (let i = y - 1; i >= 0; i--) {
        arr[i] = [];
        for (let j = x - 1; j >= 0; j--) {
            arr[i][j] = CellStatus.Empty;
        }
    }
    randomFilling(arr, fullness);
    return arr;
};
export const generateAge = (arr: Array<Array<CellStatus>>): Array<Array<CellStatus>> => {
    const newArray = JSON.parse(JSON.stringify(arr));
    const currentIndex = (item: number) => {
        let prev = item - 1;
        let next = item + 1;
        if (item === 0) {
            prev = arr.length - 1;
        } else if (item == arr.length - 1) {
            next = 0;
        }
        return {
            prev: prev,
            next: next,
            curr: item,
        };
    };
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            const y = currentIndex(i);
            const x = currentIndex(j);
            const MooreNeighborhood = [
                arr[y.prev][x.prev],
                arr[y.prev][x.curr],
                arr[y.prev][x.next],
                arr[y.curr][x.prev],
                arr[y.curr][x.next],
                arr[y.next][x.prev],
                arr[y.next][x.curr],
                arr[y.next][x.next],
            ];
            const livingCells = (arr: Array<CellStatus>): number => {
                let result = 0;
                for (let k = 0; k < arr.length; k++) {
                    if (arr[k] === CellStatus.Living || arr[k] === CellStatus.Young) {
                        result++;
                    }
                }
                return result;
            };
            if (arr[i][j] === CellStatus.Empty) {
                if (livingCells(MooreNeighborhood) === 3) {
                    newArray[i][j] = CellStatus.Young;
                }
            }
            if (arr[i][j] === CellStatus.Living || arr[i][j] === CellStatus.Young) {
                if (livingCells(MooreNeighborhood) === 2 || livingCells(MooreNeighborhood) === 3) {
                    newArray[i][j] = CellStatus.Living;
                } else if (
                    livingCells(MooreNeighborhood) < 2 ||
                    livingCells(MooreNeighborhood) > 3
                ) {
                    newArray[i][j] = CellStatus.Empty;
                }
            }
        }
    }
    return newArray;
};

import * as React from 'react';
import styled from '@emotion/styled';
import { Cell, CellStatus } from './components';

const Game = styled.div((props: { isAnimation: boolean }) => ({
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    color: '#4D2A0C',
    height: '100vh',
    position: 'relative',
    backgroundColor: '#fcf1e4',
    fontFamily: 'Comic Sans MS',
    '&::after': {
        content: props.isAnimation ? '""' : 'none',
        backgroundImage: 'url("src/img/pusheen.gif")',
        backgroundPosition: '50% 50%',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#fcf1e4',
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
    },
}));
const FieldContainer = styled.div(() => ({
    backgroundColor: 'white',
    border: '2px solid #4D2A0C',
    width: 'max-content',
}));
const SmallInput = styled.input(() => ({
    backgroundColor: '',
    color: '#4D2A0C',
    border: '2px solid #B5A99D',
    borderRadius: '20px',
    padding: '10px',
    fontSize: '14px',
    margin: '0 10px 5px 0',
    width: '50px',
    ':focus': {
        transitionDuration: '0.3s',
        borderColor: '#4D2A0C',
    },
}));
SmallInput.displayName = 'SmallInput';
const Input = styled.input(() => ({
    backgroundColor: '',
    color: '#4D2A0C',
    border: '2px solid #B5A99D',
    borderRadius: '20px',
    padding: '10px',
    fontSize: '14px',
    margin: '0 10px 5px 0',
    ':focus': {
        transitionDuration: '0.3s',
        borderColor: '#4D2A0C',
    },
}));
Input.displayName = 'Input';
const OutlineBtn = styled.button(() => ({
    backgroundColor: '#B5A99D',
    color: '#F9EBDE',
    border: '2px solid #4D2A0C',
    borderRadius: '20px',
    padding: '10px',
    fontSize: '14px',
    marginRight: '10px',
    ':hover': {
        backgroundColor: '#4D2A0C',
        transitionDuration: '0.3s',
        color: '#F9EBDE',
    },
}));
OutlineBtn.displayName = 'OutlineBtn';
const Btn = styled.button(() => ({
    backgroundColor: '#4D2A0C',
    border: '2px solid #4D2A0C',
    color: '#F9EBDE',
    borderRadius: '20px',
    padding: '10px',
    fontSize: '14px',
    marginRight: '10px',
    ':hover': {
        backgroundColor: '#6b513a',
        transitionDuration: '0.3s',
        color: '#F9EBDE',
    },
}));
Btn.displayName = 'Btn';
const BrownSubmit = styled.input(() => ({
    backgroundColor: '#4D2A0C',
    border: '2px solid #4D2A0C',
    color: '#F9EBDE',
    borderRadius: '20px',
    padding: '10px',
    fontSize: '14px',
    marginRight: '10px',
    ':hover': {
        backgroundColor: '#6b513a',
        transitionDuration: '0.3s',
        color: '#F9EBDE',
    },
}));
BrownSubmit.displayName = 'BrownSubmit';
const Controls = styled.div`
    margin-bottom: 10px;
`;
const FieldRow = styled.div`
    display: flex;
    flex-direction: row;
`;
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

const generateCells = (x: number, y: number, fullness: number): Array<Array<CellStatus>> => {
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
        if (item == 0) {
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

type Props = {};
type State = {
    sizeX: number;
    sizeY: number;
    fullness: number;
    cells: CellStatus[][];
    isAnimation: boolean;
    speed: number;
    interval: any;
    ageCounter: number;
    playerName: string;
};

export class Field extends React.Component<Props, State> {
    _isMounted = false;

    constructor(props: Props) {
        super(props);
        this.state = {
            sizeX: 10,
            sizeY: 10,
            fullness: 30,
            cells: generateCells(10, 10, 30),
            speed: 500,
            isAnimation: true,
            interval: 0,
            ageCounter: 0,
            playerName: 'Momo',
        };
    }

    handleChange = (event: any) => {
        const target = event.target;
        const name: string = target.name;
        this.setState({ ...this.state, [name]: target.value });
    };
    handleSubmit = (event: any) => {
        event.preventDefault();
        this.setState((prevState) => {
            return {
                ...prevState,
                cells: this.regenerateCells(prevState.sizeX, prevState.sizeY, prevState.fullness),
            };
        });
    };
    handleSubmitAuthorization = (event: any) => {
        event.preventDefault();
        this.setState((prevState) => {
            return {
                ...prevState,
                playerName: event.target.playerName,
            };
        });
    };
    randomlyFill = (event: any) => {
        this.setState((prevState) => {
            const newCells = Array.from(prevState.cells);
            randomFilling(newCells, prevState.fullness);
            return {
                ...prevState,
                cells: newCells,
            };
        });
    };
    runGame = (event: any) => {
        const interval = setInterval(() => {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    cells: generateAge(prevState.cells),
                    interval: interval,
                    ageCounter: prevState.ageCounter + 1,
                };
            });
        }, this.state.speed);
    };
    pauseGame = (event: any) => {
        clearInterval(this.state.interval);
    };
    resetGame = (event: any) => {
        const arr = Array.from(this.state.cells);
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                arr[i][j] = CellStatus.Empty;
            }
        }
        this.setState((prevState) => {
            return {
                ...prevState,
                cells: arr,
                ageCounter: 0,
            };
        });
    };
    slowerGame = (event: any) => {
        clearInterval(this.state.interval);
        this.setState((prevState) => {
            return {
                ...prevState,
                speed: prevState.speed + 500,
            };
        });
        this.runGame(event);
    };
    fasterGame = (event: any) => {
        if (this.state.speed > 500) {
            clearInterval(this.state.interval);
            this.setState((prevState) => {
                return {
                    ...prevState,
                    speed: prevState.speed - 500,
                };
            });
            this.runGame(event);
        }
    };

    isGameOver = (arr: Array<Array<CellStatus>>): boolean => {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                if (arr[i][j] != CellStatus.Empty) {
                    return false;
                }
            }
        }
        return true;
    };

    regenerateCells(x: number, y: number, fullness: number): Array<Array<CellStatus>> {
        const lastArr = this.state.cells;
        const cellsX = this.state.cells[0].length;
        const cellsY = this.state.cells.length;
        if (y > cellsY) {
            for (let i = y; i != cellsY; i--) {
                lastArr.push([]);
                for (let j = cellsX - 1; j >= 0; j--) {
                    lastArr[lastArr.length - 1][j] = CellStatus.Empty;
                }
            }
        } else if (y < cellsY) {
            for (let i = y; i != cellsY; i++) {
                lastArr.pop();
            }
        }
        if (x > cellsX) {
            for (let i = 0; i < y; i++) {
                for (let j = x; j != cellsX; j--) {
                    lastArr[i].push(CellStatus.Empty);
                }
            }
        } else if (x < cellsX) {
            for (let i = 0; i < y; i++) {
                for (let j = x; j != cellsX; j++) {
                    lastArr[i].pop();
                }
            }
        }
        return lastArr;
    }

    toggleStatus(i: number, j: number): void {
        const cells = Array.from(this.state.cells);
        if (this.state.cells[i][j] === CellStatus.Empty) {
            cells[i][j] = CellStatus.Young;
        } else {
            cells[i][j] = CellStatus.Empty;
        }
        this.setState({ cells: cells });
    }

    componentDidMount(): void {
        this._isMounted = true;
        if (this._isMounted) {
            setTimeout(() => {
                this.setState({ isAnimation: false });
            }, 1000);
        }
    }

    componentDidUpdate(): void {
        if (this.isGameOver(this.state.cells)) {
            clearInterval(this.state.interval);
        }
    }

    componentWillUnmount(): void {
        this._isMounted = false;
    }

    render(): JSX.Element {
        return (
            <Game isAnimation={this.state.isAnimation}>
                <h1>Game of Life</h1>
                <h2>Player - {this.state.playerName}</h2>
                <Controls>
                    <form onSubmit={this.handleSubmitAuthorization}>
                        <Input
                            type="text"
                            placeholder="Enter your name"
                            name="playerName"
                            onChange={this.handleChange}
                        />
                        <BrownSubmit
                            type="submit"
                            name="playerNameSubmit"
                            placeholder="Start"
                            value="Start"
                        />
                    </form>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <SmallInput
                                type="number"
                                value={this.state.sizeX}
                                name="sizeX"
                                onChange={this.handleChange}
                            />
                            <label>
                                X
                                <SmallInput
                                    type="number"
                                    value={this.state.sizeY}
                                    name="sizeY"
                                    onChange={this.handleChange}
                                />
                            </label>
                            <BrownSubmit
                                type="submit"
                                placeholder="Generate Field"
                                value="Generate field"
                                name="generateField"
                            />
                        </div>
                        <label>
                            fullness(%)
                            <SmallInput
                                type="number"
                                value={this.state.fullness}
                                name="fullness"
                                onChange={this.handleChange}
                            />
                        </label>
                        <Btn name="randomlyFillButton" onClick={this.randomlyFill}>
                            Randomly fill cells
                        </Btn>
                        <div>
                            <OutlineBtn name="runGame" onClick={this.runGame}>
                                Start
                            </OutlineBtn>
                            <OutlineBtn name="pauseGame" onClick={this.pauseGame}>
                                Pause
                            </OutlineBtn>
                            <OutlineBtn name="resetGame" onClick={this.resetGame}>
                                Reset
                            </OutlineBtn>
                            <OutlineBtn name="slowerGame" onClick={this.slowerGame}>
                                Slower
                            </OutlineBtn>
                            <SmallInput
                                type="number"
                                value={this.state.speed}
                                name="speed"
                                onChange={this.handleChange}
                            />
                            <OutlineBtn name="fasterGame" onClick={this.fasterGame}>Faster</OutlineBtn>
                        </div>
                    </form>
                </Controls>
                <div> Age - {this.state.ageCounter}</div>
                <FieldContainer>
                    {this.state.cells.map((row: Array<CellStatus>, i: number) => (
                        <FieldRow key={'row' + i}>
                            {row.map((status: CellStatus, j: number) => {
                                return (
                                    <Cell
                                        key={'row' + i + 'col' + j}
                                        status={status}
                                        onClick={(): void => this.toggleStatus(i, j)}
                                    />
                                );
                            })}
                        </FieldRow>
                    ))}
                </FieldContainer>
            </Game>
        );
    }
}

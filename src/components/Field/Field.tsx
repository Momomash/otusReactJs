import * as React from 'react';
import { Cell, CellStatus } from './components';
import {
    Game,
    FieldContainer,
    SmallInput,
    Input,
    OutlineBtn,
    Btn,
    BrownSubmit,
    Controls,
    FieldRow,
} from './emotionWrappers';
import { randomFilling, generateCells, generateAge } from './helpers';

type Props = {};
type State = {
    sizeX: number;
    sizeY: number;
    fullness: number;
    cells: CellStatus[][];
    isAnimation: boolean;
    delay: number;
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
            delay: 500,
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
        this.setState({ playerName: event.target.playerName });
    };
    randomlyFill = (event: any) => {
        this.setState((prevState) => {
            const newCells = Array.from(prevState.cells);
            randomFilling(newCells, prevState.fullness);
            return {
                cells: newCells,
            };
        });
    };
    runGame = (event: any) => {
        const interval = setInterval(() => {
            this.setState((prevState) => {
                return {
                    cells: generateAge(prevState.cells),
                    interval: interval,
                    ageCounter: prevState.ageCounter + 1,
                };
            });
        }, this.state.delay);
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
        this.setState(() => {
            return {
                cells: arr,
                ageCounter: 0,
            };
        });
    };
    slowerGame = (event: any) => {
        clearInterval(this.state.interval);
        this.setState((prevState) => {
            return {
                delay: prevState.delay + 500,
            };
        });
        this.runGame(event);
    };
    fasterGame = (event: any) => {
        if (this.state.delay > 500) {
            clearInterval(this.state.interval);
            this.setState((prevState) => {
                return {
                    delay: prevState.delay - 500,
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
                                value={this.state.delay}
                                name="delay"
                                onChange={this.handleChange}
                            />
                            <OutlineBtn name="fasterGame" onClick={this.fasterGame}>
                                Faster
                            </OutlineBtn>
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

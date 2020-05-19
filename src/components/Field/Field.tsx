import * as React from 'react';
import { Cell, CellStatus } from './components';
import { Controls } from './components';
import { Game, FieldContainer, FieldRow } from './emotionWrappers';
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
    state = {
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
    handleChange = (event: any): void => {
        const target = event.target;
        const name: string = target.name;
        this.setState({ ...this.state, [name]: target.value });
    };
    handleSubmit = (event: any) => {
        event.preventDefault();
        this.setState((prevState) => {
            return {
                ...prevState,
                cells: this.regenerateCells(prevState.sizeX, prevState.sizeY),
            };
        });
    };
    handleSubmitAuthorization = (event: any) => {
        event.preventDefault();
        this.setState({ playerName: event.target.playerName });
    };
    randomlyFill = (event: any): void => {
        this.setState((prevState) => {
            const newCells = Array.from(prevState.cells);
            randomFilling(newCells, prevState.fullness);
            return {
                cells: newCells,
            };
        });
    };
    runGame = (event: any): void => {
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
    pauseGame = (event: any): void => {
        clearInterval(this.state.interval);
    };
    resetGame = (event: any): void => {
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
    slowerGame = (event: any): void => {
        clearInterval(this.state.interval);
        this.setState((prevState) => {
            return {
                delay: prevState.delay + 500,
            };
        });
        this.runGame(event);
    };
    fasterGame = (event: any): void => {
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

    regenerateCells(x: number, y: number): Array<Array<CellStatus>> {
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

    toggleStatus = (i: number, j: number): void => {
        const cells = Array.from(this.state.cells);
        if (this.state.cells[i][j] === CellStatus.Empty) {
            cells[i][j] = CellStatus.Young;
        } else {
            cells[i][j] = CellStatus.Empty;
        }
        this.setState({ cells: cells });
    };

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
                <Controls
                    sizeX={this.state.sizeX}
                    sizeY={this.state.sizeY}
                    fullness={this.state.fullness}
                    delay={this.state.delay}
                    handleSubmitAuthorization={this.handleSubmitAuthorization}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    randomlyFill={this.randomlyFill}
                    runGame={this.runGame}
                    pauseGame={this.pauseGame}
                    resetGame={this.resetGame}
                    slowerGame={this.slowerGame}
                    fasterGame={this.fasterGame}
                />
                <div> Age - {this.state.ageCounter}</div>;
                <FieldContainer>
                    {this.state.cells.map((row: Array<CellStatus>, i: number) => (
                        <FieldRow key={'row' + i}>
                            {row.map((status: CellStatus, j: number) => {
                                return (
                                    <Cell
                                        key={'row' + i + 'col' + j}
                                        status={status}
                                        onClick={this.toggleStatus}
                                        coordinateY={i}
                                        coordinateX={j}
                                    />
                                );
                            })}
                        </FieldRow>
                    ))}
                </FieldContainer>
                ;
            </Game>
        );
    }
}

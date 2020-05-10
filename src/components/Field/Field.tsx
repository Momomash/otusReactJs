import * as React from 'react';
import styled from '@emotion/styled';
import { CellStatus, Cell } from './components';

const generateCells = (x: number, y: number): Array<Array<CellStatus>> => {
    const arr: Array<Array<CellStatus>> = [];
    for (let i = y - 1; i >= 0; i--) {
        arr[i] = [];
        for (let j = x - 1; j >= 0; j--) {
            arr[i][j] = CellStatus.Empty;
        }
    }
    return arr;
};

const Game = styled.div((props: { isAnimation: boolean }) => ({
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    height: '100vh',
    position: 'relative',
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
const FieldContainer = styled.div`
    background-color: white;
    border: 2px solid gray;
    width: max-content;
`;
const Controls = styled.div`
    margin-bottom: 10px;
`;

const FieldRow = styled.div`
    display: flex;
    flex-direction: row;
`;

type Props = {};
type State = {
    sizeX: number;
    sizeY: number;
    cells: CellStatus[][];
    isAnimation: boolean;
};

export class Field extends React.Component<Props, State> {
    _isMounted = false;

    constructor(props: Props) {
        super(props);
        this.state = {
            sizeX: 10,
            sizeY: 10,
            cells: generateCells(10, 10),
            isAnimation: true,
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
                cells: this.regenerateCells(prevState.sizeX, prevState.sizeY),
            };
        });
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

    toggleStatus(i: number, j: number): void {
        const cells = Array.from(this.state.cells);
        if (this.state.cells[i][j] === CellStatus.Empty) {
            cells[i][j] = CellStatus.Living;
        } else if (this.state.cells[i][j] === CellStatus.Living) {
            cells[i][j] = CellStatus.Empty;
        }
        this.setState({ cells: cells });
    }

    componentDidMount(): void {
        this._isMounted = true;
        if (this._isMounted) {
            setTimeout(() => {
                this.setState({ isAnimation: false });
            }, 3000);
        }
    }

    componentWillUnmount(): void {
        this._isMounted = false;
    }

    render(): JSX.Element {
        return (
            <Game isAnimation={this.state.isAnimation}>
                <h1>Game of Life</h1>
                <Controls>
                    <form onSubmit={this.handleSubmit}>
                        <input
                            type="number"
                            value={this.state.sizeX}
                            name="sizeX"
                            onChange={this.handleChange}
                        />
                        <input
                            type="number"
                            value={this.state.sizeY}
                            name="sizeY"
                            onChange={this.handleChange}
                        />
                        <input type="submit" placeholder="Generate Field" value="Generate field" />
                    </form>
                </Controls>
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

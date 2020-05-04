import * as React from 'react';

import styled from '@emotion/styled';
import { CellStatus, Cell } from './components';

const Game = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
`;
const FieldContainer = styled.div`
    background-color: white;
    border: 2px solid gray;
    width: max-content;
`;
const Controls = styled.div``;

const FieldRow = styled.div`
    display: flex;
    flex-direction: row;
`;

type Props = {};
type State = {
    sizeX: number;
    sizeY: number;
    cells: any;
};

export class Field extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            sizeX: 10,
            sizeY: 10,
            cells: this.generateCells(10, 10),
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: any) {
        const target = event.target;
        const name: string = target.name;
        this.setState({ ...this.state, [name]: event.target.value });
    }

    handleSubmit(event: any) {
        event.preventDefault();
        console.log('fff');
        this.setState({
            cells: this.regenerateCells(this.state.sizeX, this.state.sizeY),
        });
    }

    generateCells(x: number, y: number): Array<Array<CellStatus>> {
        const arr: Array<Array<CellStatus>> = [];
        for (let i = y - 1; i >= 0; i--) {
            arr[i] = [];
            for (let j = x - 1; j >= 0; j--) {
                arr[i][j] = CellStatus.Empty;
            }
        }
        return arr;
    }

    regenerateCells(x: number, y: number): Array<Array<CellStatus>> {
        console.log(this.state.cells);
        const lastArr = this.state.cells;
        const cellsX = this.state.cells[0].length;
        const cellsY = this.state.cells.length;
        if (y > cellsY) {
            for (let i = y; i != cellsY; i--) {
                lastArr.push([]);
                for (let j = cellsX; j > 0; j--) {
                    lastArr[lastArr.length - 1][j] = CellStatus.Empty;
                }
            }
        }
        if (y < cellsY) {
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
        }
        if (x < cellsX) {
            for (let i = 0; i < y; i++) {
                for (let j = x; j != cellsX; j++) {
                    lastArr[i].pop();
                }
            }
        }
        return lastArr;
    }

    toggleStatus(i: number, j: number) {
        const cells = this.state.cells;
        if (this.state.cells[i][j] === CellStatus.Empty) {
            cells[i][j] = CellStatus.Living;
        } else if (this.state.cells[i][j] === CellStatus.Living) {
            cells[i][j] = CellStatus.Empty;
        }
        this.setState({ cells: cells });
    }

    render() {
        return (
            <Game>
                <h1>Game of Life</h1>
                <FieldContainer>
                    <Controls>
                        <form onSubmit={this.handleSubmit}>
                            <input
                                type="number"
                                value={this.state.sizeX}
                                name="sizeX"
                                onChange={this.handleChange}
                                placeholder="X"
                            />
                            <input
                                type="number"
                                value={this.state.sizeY}
                                name="sizeY"
                                onChange={this.handleChange}
                                placeholder="Y"
                            />
                            <input
                                type="submit"
                                placeholder="Generate Field"
                                value="Generate field"
                            />
                        </form>
                    </Controls>
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

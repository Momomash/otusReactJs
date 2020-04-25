import * as React from 'react';

import styled from '@emotion/styled';

enum CellStatus {
    Empty = 0,
    Living = 1,
    Young = 2,
}

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
const EmptyCell = styled.div`
    background-color: white;
    border: 1px solid lightgray;
    width: 20px;
    height: 20px;
`;
const LivingCell = styled.div`
    background-color: green;
    border: 1px solid white;
    width: 20px;
    height: 20px;
`;
const YongCell = styled.div`
    background-color: lightgreen;
    border: 1px solid white;
    width: 20px;
    height: 20px;
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
        this.setState({
            cells: this.generateCells(this.state.sizeX, this.state.sizeY),
        });
        event.preventDefault();
    }

    generateCells(x: number, y: number): Array<Array<CellStatus>> {
        const arr: Array<Array<CellStatus>> = [];
        for (let i = y; i > 0; i--) {
            arr[i] = [];
            for (let j = x; j > 0; j--) {
                arr[i][j] = CellStatus.Empty;
            }
        }
        return arr;
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
                                min="10"
                                value={this.state.sizeX}
                                name="sizeX"
                                onChange={this.handleChange}
                                placeholder="X"
                            />
                            <input
                                type="number"
                                min="10"
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
                    {this.state.cells.map((i: Array<number>) => (
                        <FieldRow>
                            {i.map((j: number) => {
                                if (j === CellStatus.Empty) {
                                    return <EmptyCell/>;
                                } else if (j === CellStatus.Living) {
                                    return <LivingCell/>;
                                } else {
                                    return <YongCell/>;
                                }
                            })}
                        </FieldRow>
                    ))}
                </FieldContainer>
            </Game>
        );
    }
}
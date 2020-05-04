import * as React from 'react';

import styled from '@emotion/styled';

export enum CellStatus {
    Empty = 0,
    Living = 1,
    Young = 2,
}
//emotion
const CellDiv = styled.div((props: { status: CellStatus }) => ({
    backgroundColor:
        props.status === CellStatus.Empty
            ? 'white'
            : props.status === CellStatus.Living
            ? 'lawngreen'
            : 'greenyellow',
    border: '1px solid lightgray',
    width: '20px',
    height: '20px',
}));
//end emotion

type Props = {
    status: CellStatus;
    onClick: () => void;
};
type State = {};

export class Cell extends React.Component<Props, State> {
    render() {
        return <CellDiv status={this.props.status} onClick={(): void => this.props.onClick()} />;
    }
}

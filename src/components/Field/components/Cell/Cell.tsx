import * as React from 'react';

import styled from '@emotion/styled';

export enum CellStatus {
    Empty = 0,
    Living = 1,
    Young = 2,
}

const CellDiv = styled.div((props: { status: CellStatus; animation: boolean }) => ({
    backgroundColor:
        props.status === CellStatus.Empty
            ? 'white'
            : props.status === CellStatus.Living
            ? 'lawngreen'
            : 'greenyellow',
    border: '1px solid lightgray',
    width: '20px',
    height: '20px',
    transitionDuration: props.animation ? '1s' : '0s',
}));

type Props = {
    status: CellStatus;
    onClick: () => void;
};
type State = {
    animation: boolean;
};

export class Cell extends React.Component<Props, State> {
    state = { animation: false };
    componentDidUpdate(prevProps: Props): void {
        const { status } = this.props;
        if (prevProps.status !== status) {
            if (status !== CellStatus.Empty) {
                this.setState({ animation: true });
            } else {
                this.setState({ animation: false });
            }
        }
    }
    render(): JSX.Element {
        return (
            <CellDiv
                animation={this.state.animation}
                status={this.props.status}
                onClick={(): void => this.props.onClick()}
            />
        );
    }
}

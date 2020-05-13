import * as React from 'react';

import styled from '@emotion/styled';

export enum CellStatus {
    Empty = 0,
    Living = 1,
    Young = 2,
}

const CellDiv = styled.div((props: { status: CellStatus; isAnimation: boolean }) => ({
    backgroundColor:
        props.status === CellStatus.Empty
            ? 'white'
            : props.status === CellStatus.Living
            ? '#ebded3'
            : '#584F4A',
    border: '1px solid #FCF1E4',
    width: '25px',
    height: '25px',
    transitionDuration: props.isAnimation ? '0.5s' : '0s',
}));

type Props = {
    status: CellStatus;
    onClick: () => void;
};
type State = {
    isAnimation: boolean;
};

export class Cell extends React.Component<Props, State> {
    state = { isAnimation: false };
    componentDidUpdate(prevProps: Props): void {
        const { status } = this.props;
        if (prevProps.status !== status) {
            if (status !== CellStatus.Empty) {
                this.setState({ isAnimation: true });
            } else {
                this.setState({ isAnimation: false });
            }
        }
    }
    render(): JSX.Element {
        return (
            <CellDiv
                isAnimation={this.state.isAnimation}
                status={this.props.status}
                onClick={(): void => this.props.onClick()}
            />
        );
    }
}

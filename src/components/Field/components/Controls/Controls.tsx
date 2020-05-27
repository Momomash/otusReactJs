import * as React from 'react';
import {
    ControlsWrapper,
    BrownSubmit,
    Btn,
    Input,
    OutlineBtn,
    SmallInput,
} from './emotionWrappers';

type Props = {
    sizeX: number;
    sizeY: number;
    fullness: number;
    delay: number;
    handleChange: (event: any) => void;
    handleSubmit: (event: any) => void;
    randomlyFill: (event: any) => void;
    runGame: (event: any) => void;
    pauseGame: (event: any) => void;
    resetGame: (event: any) => void;
    slowerGame: (event: any) => void;
    fasterGame: (event: any) => void;
};
type State = {};

export class Controls extends React.Component<Props, State> {
    render(): JSX.Element {
        return (
            <ControlsWrapper>
                <form onSubmit={this.props.handleSubmit}>
                    <div>
                        <SmallInput
                            type="number"
                            value={this.props.sizeX}
                            name="sizeX"
                            onChange={this.props.handleChange}
                        />
                        <label>
                            X
                            <SmallInput
                                type="number"
                                value={this.props.sizeY}
                                name="sizeY"
                                onChange={this.props.handleChange}
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
                            value={this.props.fullness}
                            name="fullness"
                            onChange={this.props.handleChange}
                        />
                    </label>
                    <Btn name="randomlyFillButton" onClick={this.props.randomlyFill}>
                        Randomly fill cells
                    </Btn>
                    <div>
                        <OutlineBtn name="runGame" onClick={this.props.runGame}>
                            Start
                        </OutlineBtn>
                        <OutlineBtn name="pauseGame" onClick={this.props.pauseGame}>
                            Pause
                        </OutlineBtn>
                        <OutlineBtn name="resetGame" onClick={this.props.resetGame}>
                            Reset
                        </OutlineBtn>
                        <OutlineBtn name="slowerGame" onClick={this.props.slowerGame}>
                            Slower
                        </OutlineBtn>
                        <SmallInput
                            type="number"
                            value={this.props.delay}
                            name="delay"
                            onChange={this.props.handleChange}
                        />
                        <OutlineBtn name="fasterGame" onClick={this.props.fasterGame}>
                            Faster
                        </OutlineBtn>
                    </div>
                </form>
            </ControlsWrapper>
        );
    }
}

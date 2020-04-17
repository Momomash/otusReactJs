import * as React from "react";

export default class HelloWorld extends React.Component<{userName:string}, { userName: string }> {
    render() {
        return (
            <h1>Hello World {this.props.userName}</h1>
        );
    }
}
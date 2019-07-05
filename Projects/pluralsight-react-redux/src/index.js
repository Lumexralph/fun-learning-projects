import React from "react";
import ReactDOM from "react-dom";


const root = document.getElementById('app');

class Button extends React.Component{
    render() {
      return (
        <button>Click me! {this.props.value}</button>
      );
    }
}

const Result = (props) => {
  return (
    <div>Increase count: {props.result}</div>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
    // this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
      <div>
        <Button value={5} />
        <Button value={30} />
        <Result result={this.state.value} />
      </div>
    );
  }
}

ReactDOM.render(<App />, root);

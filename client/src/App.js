import * as React from "react";
import "./App.css";

import { HelloRequest } from "./helloworld/helloworld_pb";
import { GreeterClient } from "./helloworld/helloworld_grpc_web_pb";

const initialState = {
  inputText: "World",
  message: ""
};

class App extends React.Component {
  state = initialState;

  render() {
    return (
      <div className="App">
        <input
          type="text"
          value={this.state.inputText}
          onChange={this.onChange}
        />
        <button onClick={this.onClick}>Send</button>
        <p>{this.state.message}</p>
      </div>
    );
  }

  onClick = () => {
    const request = new HelloRequest();
    request.setName(this.state.inputText);

    const client = new GreeterClient("http://localhost:8181", {}, {});
    client.sayHello(request, {}, (err, ret) => {
      if (err || ret === null) {
        throw err;
      }
      this.setState({ message: ret.getMessage() });
    });
  };

  onChange = e => {
    this.setState({ inputText: e.target.value });
  };
}

export default App;

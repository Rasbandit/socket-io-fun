import React, { Component } from "react";
import "./App.css";
import { subscribeToTimer, emitMessage, getMessages } from "./api";

class App extends Component {
  constructor() {
    super();
    this.state = {
      timestamp: "no timestamp yet",
      messages: ["nothing yet"],
      userInput: ""
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    subscribeToTimer((err, timestamp) =>
      this.setState({
        timestamp
      })
    );
    let messagesArr = getMessages();
    this.setState({ messages: messagesArr });
  }
  handleInput(event) {
    this.setState({ userInput: event.target.value });
  }
  handleClick() {
    const message = this.state.userInput;
    emitMessage(message);
  }
  render() {
    console.log("messages arr", this.state.messages);
    return (
      <div className="App">
        <div>Timestamp: {this.state.timestamp}</div>
        <input type="text" onChange={this.handleInput} placeholder="enter message" />
        <button onClick={this.handleClick}>submit</button>
        <div className="chat-box">{this.state.messages.map((message, index) => <div key={index}>{message}</div>)}</div>
      </div>
    );
  }
}

export default App;

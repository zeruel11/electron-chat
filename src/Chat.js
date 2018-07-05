import React, { Component } from "react";
import { ChatManager, TokenProvider } from "@pusher/chatkit";
import MessageList from "./MessageList";

class Chat extends Component {
  state = {
    currentUser: null,
    currentRoom: {},
    messages: []
  };

  componentDidMount() {
    const chatkit = new ChatManager({
      instanceLocator: "v1:us1:777da375-f9f3-4cb5-b8de-c5e458668c35",
      userId: this.props.currentId,
      tokenProvider: new TokenProvider({
        url:
          "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/777da375-f9f3-4cb5-b8de-c5e458668c35/token"
      })
    });

    chatkit
      .connect()
      .then(currentUser => {
        this.setState({ currentUser });
        console.log("Bleep bloop 🤖 You are connected to Chatkit"); // eslint-disable-line no-console
        return currentUser.subscribeToRoom({
          roomId: 10963923,
          messageLimit: 100,
          hooks: {
            onNewMessage: message => {
              this.setState({
                messages: [...this.state.messages, message]
              });
            }
          }
        });
      })
      .then(currentRoom => {
        this.setState({ currentRoom });
      })
      .catch(error => console.error("error", error)); // eslint-disable-line no-console
  }

  render() {
    return (
      <div className="wrapper">
        <div className="chat">
          <MessageList messages={this.state.messages} />
        </div>
      </div>
    );
  }
}

export default Chat;

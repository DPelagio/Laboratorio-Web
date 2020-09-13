import React, { Component } from 'react';
import Chatbot from "react-chatbot-kit";

import config from "./configs/chatbotConfig";
import MessageParser from "./chatbot/MessageParser";
import ActionProvider from "./chatbot/ActionProvider";


class ChatbotKit extends Component {
  render() {
    return (
        <div className="App">
            <Chatbot
              config={config}
              messageParser={MessageParser}
              actionProvider={ActionProvider}
            />
        </div>
    );
  }
}

export default ChatbotKit;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'
import Chatbot from "react-chatbot-kit";

import config from "./configs/chatbotConfig";
import MessageParser from "./chatbot/MessageParser";
import ActionProvider from "./chatbot/ActionProvider";

class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      response :'',
    };
  }

  componentWillMount() {
    const { steps } = this.props;
    const { message} =  steps;
    let res;

    this.setState({ message});

    axios.post('http://127.0.0.1:5002/getMessage', {
      message: message.value,
    })
    .then(res => {

      const response = res.data.este_es_el_mensaje.response;
      this.setState({ response});
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  render() {
    const { message,response} = this.state;
    return (
      <div style={{ width: '100%' }}>
        <h3>{response}</h3>
      </div>
    );
  }
}

Review.propTypes = {
  steps: PropTypes.object,
};

Review.defaultProps = {
  steps: undefined,
};

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

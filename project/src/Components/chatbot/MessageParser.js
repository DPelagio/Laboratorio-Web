import axios from 'axios'

class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    // State represents the chatbot state and is passed
    // in at initalization. You can use it to read chatbot state
    // inside the messageParser
    this.state = state

  }

  parse = (message) => {
    const lowerCase = message.toLowerCase();

    axios.post('http://127.0.0.1:5002/getMessage', {
      message: lowerCase,
    })
    .then(res => {

      const response = res.data.este_es_el_mensaje.response;
      return this.actionProvider.handleMessageParser(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  };

}

export default MessageParser;

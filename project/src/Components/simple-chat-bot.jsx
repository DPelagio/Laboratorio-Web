import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';
import axios from 'axios'

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

class SimpleForm extends Component {
  render() {
    return (
      <ChatBot
        steps={[
          {
            id: '1',
            message: 'Hi, what can I help you?',
            trigger: 'message',
          },
          {
            id: 'message',
            user: true,
            trigger: '3',
          },
          {
            id: '3',
            component: <Review />,
            waitAction: false,
            trigger: '4',
          },
          {
            id: '4',
            message: 'Que mas puedo hacer por ti?',
            trigger: 'message',
          },
        ]}
      />
    );
  }
}

export default SimpleForm;
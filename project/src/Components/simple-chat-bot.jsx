import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';
import axios from 'axios'

class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
    };
  }

  componentWillMount() {
    const { steps } = this.props;
    const { message} =  steps;

    this.setState({ message});

    axios.post('http://127.0.0.1:5002/getMessage', {
      message: message,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const { message} = this.state;
    return (
      <div style={{ width: '100%' }}>
        <h3>Summary</h3>
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{message.value}</td>
            </tr>
            <tr>
              <td>Gender</td>
              <td>Gender</td>
            </tr>
            <tr>
              <td>Age</td>
              <td>Age</td>
            </tr>
          </tbody>
        </table>
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
            waitAction: true,
            trigger: '1',
          },
        ]}
      />
    );
  }
}

export default SimpleForm;
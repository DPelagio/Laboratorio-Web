import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';
import axios from 'axios'
import { ThemeProvider } from 'styled-components';
import parse from 'html-react-parser';
import { Carousel ,Card} from "react-bootstrap";
import image from "../img/ipad.png";
import JsxParser from 'react-jsx-parser'

//Styles
import "./chat-bot-bubble.scss"


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
      parse(response)

      /*
<Carousel>
<Carousel.Item>
  <Card style={{ width: '100%' }}>
  <Card.Img style={{ height: '200px' }} variant="top" src={image} />
  <Card.Body>
    <Card.Title>Ipad 32 gb</Card.Title>
    <Card.Text>
      &#36;299
    </Card.Text>
  </Card.Body>
  </Card>
</Carousel.Item>
<Carousel.Item>
 <Card style={{ width: '100%' }}>
  <Card.Img style={{ height: '200px' }} variant="top" src={image} />
  <Card.Body>
   <Card.Title>Ipad 64 gb</Card.Title>
   <Card.Text>
    &#36;399
   </Card.Text>
  </Card.Body>
 </Card>
</Carousel.Item>
<Carousel.Item>
 <Card style={{ width: '100%' }}>
  <Card.Img style={{ height: '200px' }} variant="top" src={image} />
   <Card.Body>
    <Card.Title>Ipad 128 gb</Card.Title>
    <Card.Text>
     &#36;499
    </Card.Text>
   </Card.Body>
  </Card>
</Carousel.Item>
</Carousel>
*/
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

    const theme = {
      background: '#e6f8ff',
      fontFamily: 'Helvetica Neue',
      headerBgColor: '#17c1ff',
      headerFontColor: '#fff',
      headerFontSize: '15px',
      botBubbleColor: '#17c1ff',
      botFontColor: '#fff',
      userBubbleColor: '#fff',
      userFontColor: '#4a4a4a',
    };

    return (
      <ThemeProvider theme={theme}>

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
              trigger: 'message',
            }
          ]}
        />

      </ThemeProvider>
      
    );
  }
}

export default SimpleForm;
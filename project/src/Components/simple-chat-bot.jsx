import React, { useState ,useEffect} from 'react';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';
import axios from 'axios'
import { ThemeProvider } from 'styled-components';
import parse from 'html-react-parser';
import JsxParser from 'react-jsx-parser';
import Carrusel from "./Carrusel"

//Styles
import "./chat-bot-bubble.scss"


function SimpleForm(props){
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

  const [response, setResponse] = useState("hola");

  const [tri, setTri] = useState(1);

  function getMessage(message) {

    axios.post('http://127.0.0.1:5002/getMessage', {
      message: message,
    })
    .then(res => {

      setResponse("res.data")
      console.log("Hhhh")
      return 1
  
    })
    .catch(function (error) {
      console.log(error);
      return 3
    });
    
  }

  useEffect(() => {
    // action on update of movies
  }, [response]);

  

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
            component: <Carrusel/>,
            trigger: 'message',
          }
        ]}
      />

    </ThemeProvider>
    
  )
}
export default SimpleForm;
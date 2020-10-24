import React, { useState ,useEffect} from 'react';
import { Widget , addResponseMessage, renderCustomComponent} from 'react-chat-widget';
import axios from 'axios'


import Carrusel from "./Carrusel"
import Option from "./Option"
import "bootstrap/dist/css/bootstrap.min.css";

import 'react-chat-widget/lib/styles.css';

function ReactChatWidget(props){

    const [res,setRes] = ("")
    const [sessionId, setSessionId] = ("")

    useEffect(() => {

      

        addResponseMessage('Hola, Podemos ayudarte a armar tu computadora!');
    
    }, []);


    const handleNewUserMessage = (newMessage) => {
        //console.log(`New message incoming! ${newMessage}`);
        // Now send the message throught the backend API
        console.log(newMessage)
        axios.post('http://127.0.0.1:5002/getMessage', {
          message: newMessage,
        })
        .then(res => {
          
          console.log(res)
          //setRes(res.data)


          
          addResponseMessage(res.data.response[0].text)
          if (res.data.response.length > 1 && res.data.response[1].type == "option"){
            renderCustomComponent(Option, {options:res.data.response[1].options, handle:handleNewUserMessage})
          }
          
      
        })
        .catch(function (error) {
          console.log(error);
          addResponseMessage("Perdimos la conexión con el servidor");
        });
        
    };

    return(
        <Widget
            handleNewUserMessage={handleNewUserMessage}
            title="TEC Computadoras"
            subtitle="Venta de computadoras y componentes"
        />
        
    );
}
export default ReactChatWidget;
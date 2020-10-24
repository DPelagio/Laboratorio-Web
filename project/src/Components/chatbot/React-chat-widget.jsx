import React, { useState ,useEffect} from 'react';
import { Widget , addResponseMessage, renderCustomComponent} from 'react-chat-widget';
import axios from 'axios'


import Carrousel from "./Carrousel"
import Option from "./Option"
import "bootstrap/dist/css/bootstrap.min.css";

import 'react-chat-widget/lib/styles.css';

function ReactChatWidget(props){

    const [sessionId, setSessionId] = useState("")
    const [shopcart ,setShopcart] = useState(false)
  

    useEffect(() => {

          axios.get('http://127.0.0.1:5002/createSession')
          .then(res => {

            addResponseMessage('Hola, Podemos ayudarte a armar tu computadora!');
            setSessionId(res.data)       
        
          })
          .catch(function (error) {
            console.log(error);
            addResponseMessage("Hubo un problema con el servidor");
          });
    
    }, []);


    const handleNewUserMessage = (newMessage) => {
        //console.log(`New message incoming! ${newMessage}`);
        // Now send the message throught the backend API
        console.log(newMessage)
        axios.post('http://127.0.0.1:5002/getMessage', {
          message: newMessage,
          sessionId: sessionId,
          shopcart:'hola'
        })
        .then(res => {
          

         for(let i=0;i<res.data.response.length;i++)
         {

            if(res.data.response[i].type === "text"){

              addResponseMessage(res.data.response[i].text)

            }else if(res.data.response[i].type === "option"){

              renderCustomComponent(Option, {options:res.data.response[i].options, handle:handleNewUserMessage})

            }else if(res.data.response[i].type === "carousel")
            {
              renderCustomComponent(Carrousel, {options:res.data.response[i].options, handle:handleNewUserMessage})
            }
            
         }
         
         if(res.data.response.length === 0)
         {
          addResponseMessage("Upss, no tenemos una respuesta para eso")
         }
      
        })
        .catch(function (error) {
          console.log(error);
          addResponseMessage("Hubo un problema con el servidor");
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
import React, { useState ,useEffect} from 'react';
import { Widget , addResponseMessage, renderCustomComponent} from 'react-chat-widget';

import Carrusel from "./Carrusel"


import 'react-chat-widget/lib/styles.css';

function ReactChatWidget(props){

    useEffect(() => {
        addResponseMessage('Welcome to this awesome chat!');
    }, []);

    const handleNewUserMessage = (newMessage) => {
        console.log(`New message incoming! ${newMessage}`);
        // Now send the message throught the backend API
        addResponseMessage("response");
        renderCustomComponent(Carrusel)
    };

    return(
        <Widget
            handleNewUserMessage={handleNewUserMessage}
            title="My new awesome title"
            subtitle="And my cool subtitle"
        />
    );
}
export default ReactChatWidget;
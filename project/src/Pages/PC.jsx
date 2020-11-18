import React from "react";
import ReactChatWidget from '../Components/chatbot/React-chat-widget'
import PC_parts from '../Components/PC-parts'

import "../styles/pc.css";
import "../styles/chatbot.css"

class PC extends React.Component
{
    render()
    {
        return (
            <div>
                <div className="pcBody">
                    <h1>Constuye una PC presonalizada</h1>
                    <p>Utiliza el chatbot de la derecha para empezar.</p>
                </div>
                <PC_parts />
                <div style={{ display: 'flex', position: 'sticky', top: '1em', justifyContent: 'flex-end', padding: '0 1em', color: 'black'}}>
                    <ReactChatWidget />
                </div>
            </div>
        );
    }
}

export default PC;

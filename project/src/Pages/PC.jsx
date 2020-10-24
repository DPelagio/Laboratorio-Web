import React from "react";
import ReactChatWidget from '../Components/chatbot/React-chat-widget'

class PC extends React.Component {
    render() {
        return(
            <>
            <div>
                <h1>PC...</h1>
            </div>
            <div style={{display:'flex',position:'sticky',top:'1em',justifyContent:'flex-end',padding:'0 1em'}}>
                <ReactChatWidget/>
            </div>
            </>
        );
    }
}

export default PC;
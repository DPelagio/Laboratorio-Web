import React, { useState ,useEffect} from 'react';
import axios from 'axios'
import parse from 'html-react-parser';


function ChatBotHandler(props){

    const [res,setRes] = useState("")

    function getMessage() {


        axios.post('http://127.0.0.1:5002/getMessage', {
          message: props.steps.message.value,
        })
        .then(res => {
          
          console.log(res)
          setRes(res.data)
      
        })
        .catch(function (error) {
          console.log(error);
        });
        
    }

    useEffect(() => {

      getMessage()
        
    }, [props]);

    return(
      <p>{res}</p>
    );

}
export default ChatBotHandler
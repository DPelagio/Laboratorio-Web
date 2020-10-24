import React ,{ useState ,useEffect} from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
//import { Loading } from 'react-simple-chatbot';

function Option(props){

    useEffect(() => {
        console.log(props)

    }, []);

    function handleClick(event: MouseEvent<HTMLButtonElement>){
        event.preventDefault();

        props.handle(String(event.target.value))

    }
    
    
    const items = []
    for (const i of props.options) {
        items.push(<div key = {i.value}>
                        <Button  value={i.value} onClick={handleClick}>
                            {i.name}
                         </Button>
                    </div >)

      }


    return(
        <>

            {items}
            
        </>
    );


}export default Option;
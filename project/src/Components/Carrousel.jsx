import React ,{ useState ,useEffect} from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel ,Card} from "react-bootstrap";

//import { Loading } from 'react-simple-chatbot';

function Carrousel(props){


    function handleClick(event: MouseEvent<HTMLButtonElement>){
        event.preventDefault();

        props.handle(String(event.target.value))

    }
    
    
    const items = []
    for (const i of props.options) {
        items.push(
            
            <Carousel.Item key = {i.value}>
                <Card style={{ width: '100%' }}>
                    <Card.Img style={{ height: '150px' }, {width: '150px'}, {textAlign: 'center'}} variant="top" src={i.image} />
                    <Card.Body>
                    <Card.Title style={{textAlign: 'center'}}>{i.name}</Card.Title>
                    <Card.Text style={{textAlign: 'center'}}>
                        {i.price}
                    </Card.Text >
                    <div style={{display:"flex"},{alignItems: 'center'},{justifyContent: 'center'}}>
                        <Button  value={i.value} onClick={handleClick}>
                                Agregar al carrito
                        </Button>
                    </div>
                    </Card.Body>
                </Card>
            </Carousel.Item>
            
        )

      }


    return(
        <>
            <Carousel>
                {items}
            </Carousel>
        </>
    );
}export default Carrousel;
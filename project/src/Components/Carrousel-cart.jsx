import React from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel ,Card} from "react-bootstrap";

//import { Loading } from 'react-simple-chatbot';

function CarrouselCart(props){

    const items = []
    for (const i of props.items) {
        items.push(

            <Carousel.Item key = {i._id.$oid}>
                <Card style={{ width: '300px' }}>
                    <Card.Img  style={{textAlign: 'center'}} variant="top" src={i.image} />
                    <Card.Body>
                    <Card.Title style={{textAlign: 'center'}}>{i.name}</Card.Title>
                    <Card.Text style={{textAlign: 'center'}}>
                        {i.price}
                    </Card.Text >
                    <div style={{display:"flex"},{alignItems: 'center'},{justifyContent: 'center'}, {textAlign: 'center'}}>
                        <Button id={i._id.$oid}>
                                Eliminar
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
}export default CarrouselCart;

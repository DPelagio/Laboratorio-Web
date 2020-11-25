import React ,{ useState ,useEffect} from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel ,Card} from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios'


//import { Loading } from 'react-simple-chatbot';

function Carrousel(props){

    const { user, isAuthenticated, isLoading } = useAuth0();

    function handleClick(event: MouseEvent<HTMLButtonElement>){
        event.preventDefault();

        props.handle(String(event.target.value))

        var userId = user.sub.replace('auth0|','');
        
        addItemToCart(event.target.id,userId)

    }

    function addItemToCart(itemId,userdId){

        axios.post('http://127.0.0.1:5002/addItemToCart', {
          itemId: itemId,
          userId: userdId
        })
        .then(res => {
            console.log(res);

        })
        .catch(function (error) {
            console.log(error);

        });
    }


    const items = []
    for (const i of props.options) {
        items.push(

            <Carousel.Item key = {i.value}>
                <Card style={{ width: '300px' }}>
                    <Card.Img  style={{textAlign: 'center'}} variant="top" src={i.image} />
                    <Card.Body>
                    <Card.Title style={{textAlign: 'center'}}>{i.name}</Card.Title>
                    <Card.Text style={{textAlign: 'center'}}>
                        {i.price}
                    </Card.Text >
                    <div style={{display:"flex"},{alignItems: 'center'},{justifyContent: 'center'}, {textAlign: 'center'}}>
                        <Button id={i.id} value={i.value} onClick={handleClick}>
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

import React from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel ,Card,Table} from "react-bootstrap";

//import { Loading } from 'react-simple-chatbot';

function CarrouselCart(props){

    const items = []
    /*for (const i of props.items) {
        items.push(

            <Carousel.Item key = {i._id.$oid}>
                <Card style={{display:"flex"},{alignItems: 'center'},{justifyContent: 'center'}, {textAlign: 'center'}}>
                    <Card.Img  style={{ width: '300px'}} variant="top" src={i.image} />
                </Card>
                <Card>
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

      }*/
      for (const i of props.items) {
        items.push(

            <tr style={{color:'white'}}>
                <td><Card.Img  style={{ width: '150px'}} variant="top" src={i.image} /></td>
                <td>{i.name}</td>
                <td>{i.price}</td>
                <td>
                    <Button variant="danger" id={i._id.$oid}>
                        Eliminar
                    </Button>
                </td>
            </tr>

        )

    }


    return(
        <>
            <Table bordered style={{textAlign:'center'}}>
                <thead style={{color:'white'}}>
                    <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </Table>
        </>
    );
}export default CarrouselCart;

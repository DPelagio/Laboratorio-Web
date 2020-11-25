import React ,{ useState ,useEffect}from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel ,Card,Table} from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios'

//import { Loading } from 'react-simple-chatbot';

function CarrouselCart(props){

    const { user, isAuthenticated, isLoading } = useAuth0();
    const [prod, setProd] = useState([])

    useEffect(() => {

        setProd(props.items)
        
  
    }, []);

    function removeData(id,price){

        var userId = user.sub.replace('auth0|','');

        const del = prod.filter(prod => id !== prod._id.$oid)
        setProd(del)

        props.setTotal(props.total-price)
        
        removeItemToCart(id,userId)

    }

    function removeItemToCart(itemId,userdId){

        axios.post('http://127.0.0.1:5002/removeItemToCart', {
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


    return(
        prod.map(function(item, i){
            return(
                <tr style={{color:'white'}}>
                    <td><Card.Img  style={{ width: '150px'}} variant="top" src={item.image} /></td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>
                        <Button variant="danger" id={item._id.$oid} onClick={() => removeData(item._id.$oid,item.price)}>
                            Eliminar
                        </Button>
                    </td>
                </tr>
            )
            
        })
    );
    
}export default CarrouselCart;

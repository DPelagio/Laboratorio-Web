import React, { useState ,useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import CarrouselCart from '../Components/Carrousel-cart'
import { Button } from "react-bootstrap";


function Carrito(props){

    const { user } = useAuth0();
    const [products, setProducts] = useState([])
    const [total, setTotal] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        
        setIsLoading(true)

        var userId = user.sub.replace('auth0|','');

        axios.post('http://127.0.0.1:5002/getCart', {
            userId: userId
        })
        .then(res => {

            setProducts(res.data.cart)
            setTotal(res.data.total)
            setIsLoading(false)
      
        })
        .catch(function (error) {
          console.log(error);
          setIsLoading(false)
        });
  
  }, []);

    function removeProduct(event: MouseEvent<HTMLButtonElement>){
        event.preventDefault();


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
    
    return(
        <div>
            {(!isLoading) ?
                (products.length > 0 ?
                        <div>
                            <CarrouselCart items={products}/>
                            <h1>Total: &#36;{total}</h1>
                            <Button variant="primary" size="lg" block>
                                Comprar
                            </Button>
                        </div>
                    :
                        <h1>No hay productos...</h1>
                    
                )
            :
                
                <h1>Cargando...</h1>
     
            }
        </div>
    );

}export default Carrito;
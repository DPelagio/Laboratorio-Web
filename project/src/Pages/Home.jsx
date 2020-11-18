import React from "react";
import { Button } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/home.css";

class Home extends React.Component {
    render() {
        return(
            <div className="homeBody">
                <h1>Compra una PC</h1>
                <p>Elige la opción que más te convenga.</p>
                <div>
                    <table className="preBuiltTable">
                        <tr>
                            <td><img src='./img/005-case.png' /><br />
                            Description del producto<br />
                            Especificaciones: <br />
                            Precio: <br />
                            <Button>Comprar</Button> </td>
                            <td><img src='./img/005-case.png' /><br />
                            Description del producto<br />
                            Especificaciones: <br />
                            Precio: <br />
                                <Button>Comprar</Button> </td>
                            <td><img src='./img/005-case.png' /><br />
                            Description del producto<br />
                            Especificaciones: <br />
                            Precio: <br />
                                <Button>Comprar</Button> </td>
                        </tr>
                        <tr>
                            <td><img src='./img/005-case.png' /><br />
                            Description del producto<br />
                            Especificaciones: <br />
                            Precio: <br />
                                <Button>Comprar</Button> </td>
                            <td><img src='./img/005-case.png' /><br />
                            Description del producto<br />
                            Especificaciones: <br />
                            Precio: <br />
                                <Button>Comprar</Button> </td>
                            <td><img src='./img/005-case.png'/><br />
                            Description del producto<br />
                            Especificaciones: <br />
                            Precio: <br />
                                <Button>Comprar</Button> </td>
                        </tr>
                        <tr>
                            <td><img src='./img/005-case.png' /><br />
                            Description del producto<br />
                            Especificaciones: <br />
                            Precio: <br />
                                <Button>Comprar</Button> </td>
                            <td><img src='./img/005-case.png'/><br />
                            Description del producto<br />
                            Especificaciones: <br />
                            Precio: <br />
                                <Button>Comprar</Button> </td>
                            <td><img src='./img/005-case.png' /><br />
                            Description del producto<br />
                            Especificaciones: <br />
                            Precio: <br />
                                <Button>Comprar</Button> </td>
                        </tr>
                    </table>
                </div>
            </div>
        );
    }
}

export default Home;

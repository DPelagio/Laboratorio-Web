import React from "react";

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
                                <button>Comprar</button> </td>
                            <td><img src='./img/005-case.png' /><br />
                            Description del producto<br />
                            Especificaciones: <br />
                            Precio: <br />
                                <button>Comprar</button> </td>
                            <td><img src='./img/005-case.png' /><br />
                            Description del producto<br />
                            Especificaciones: <br />
                            Precio: <br />
                                <button>Comprar</button> </td>
                        </tr>
                        <tr>
                            <td><img src='./img/005-case.png' /><br />
                            Description del producto<br />
                            Especificaciones: <br />
                            Precio: <br />
                                <button>Comprar</button> </td>
                            <td><img src='./img/005-case.png' /><br />
                            Description del producto<br />
                            Especificaciones: <br />
                            Precio: <br />
                                <button>Comprar</button> </td>
                            <td><img src='./img/005-case.png'/><br />
                            Description del producto<br />
                            Especificaciones: <br />
                            Precio: <br />
                                <button>Comprar</button> </td>
                        </tr>
                        <tr>
                            <td><img src='./img/005-case.png' /><br />
                            Description del producto<br />
                            Especificaciones: <br />
                            Precio: <br />
                                <button>Comprar</button> </td>
                            <td><img src='./img/005-case.png'/><br />
                            Description del producto<br />
                            Especificaciones: <br />
                            Precio: <br />
                                <button>Comprar</button> </td>
                            <td><img src='./img/005-case.png' /><br />
                            Description del producto<br />
                            Especificaciones: <br />
                            Precio: <br />
                                <button>Comprar</button> </td>
                        </tr>
                    </table>
                </div>
            </div>
        );
    }
}

export default Home;

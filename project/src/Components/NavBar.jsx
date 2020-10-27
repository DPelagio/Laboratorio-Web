import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import Profile from "../Components/Profile";

//import "bootstrap/dist/css/bootstrap.min.css";

class NavBar extends React.Component {
    constructor(props){
        super(props);

    }

    render() {
        return(
            <Navbar bg="dark" variant="light">
                <Navbar.Brand href="/">TECompu</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/comprar-pc">Comprar</Nav.Link>
                    <Nav.Link href="/armar-pc">Armar</Nav.Link>
                    <Nav.Link href="/carrito">Carrito</Nav.Link>
                </Nav>
                <Profile/>
            </Navbar>
        );
    }
}

export default NavBar;

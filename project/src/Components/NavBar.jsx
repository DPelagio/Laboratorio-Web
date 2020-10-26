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
                    <Nav.Link href="/home2">Home</Nav.Link>
                    <Nav.Link href="/pc2">Buy PC</Nav.Link>
                    <Nav.Link href="/carrito">Cart</Nav.Link>
                </Nav>
                <Profile/>
            </Navbar>
        );
    }
}

export default NavBar;
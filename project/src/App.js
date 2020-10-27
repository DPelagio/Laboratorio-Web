import React from 'react';
import Home from "./Pages/Home";
import PC from './Pages/PC';
import Carrito from './Pages/Carrito';
import Landing from "./Pages/Landing";

/*Design test*/

import NavBar from "./Components/NavBar";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AuthenticatedRoutes from './Pages/AuthenticatedRoutes';
import Login from './Pages/Login'

import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/">
            <Landing />
        </Route>
        <Route exact path="/login">
            <Login />
        </Route>
        <AuthenticatedRoutes
					exact path="/comprar-pc"
					component={Home}
				/>
        <AuthenticatedRoutes
					exact path="/armar-pc"
					component={PC}
				/>
        <AuthenticatedRoutes
					exact path="/carrito"
					component={Carrito}
				/>
      </Switch>
    </Router>
  );
}

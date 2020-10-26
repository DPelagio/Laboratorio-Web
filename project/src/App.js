import React from 'react';
import Home from "./Pages/Home";
import PC from './Pages/PC';
import Carrito from './Pages/Carrito';
import Landing from "./Pages/Landing";

/*Design test*/

import PC2 from "./Pages/PC2";
import Home2 from "./Pages/Home2";
import Landing2 from "./Pages/Landing2";

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
        <Route exact path="/l2">
            <Landing2 />
        </Route>
        <Route exact path="/login">
            <Login />
        </Route>
        <AuthenticatedRoutes
					exact path="/home" 
					component={Home} 
				/>
                <AuthenticatedRoutes
					exact path="/home2"
					component={Home2}
				/>
        <AuthenticatedRoutes
					exact path="/pc" 
					component={PC} 
				/>
                <AuthenticatedRoutes
					exact path="/pc2" 
					component={PC2} 
				/>
        <AuthenticatedRoutes
					exact path="/carrito" 
					component={Carrito} 
				/>
      </Switch>
    </Router>
  );
}

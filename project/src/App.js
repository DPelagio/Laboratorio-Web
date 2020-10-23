import React from 'react';
import Home from "./Pages/Home";
import User from './Pages/User';
import Landing from "./Pages/Landing";

import NavBar from "./Components/NavBar";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


import SimpleForm from './Components/simple-chat-bot'
import ReactChatWidget from './Components/React-chat-widget'


import "bootstrap/dist/css/bootstrap.min.css";


export default function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
      <Route exact path="/">
          <Landing />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/user">
          <User />
        </Route>
      </Switch>
      <div style={{display:'flex',position:'sticky',top:'1em',justifyContent:'flex-end',padding:'0 1em'}}>
          <ReactChatWidget/>
      </div>

    </Router>
  );
}

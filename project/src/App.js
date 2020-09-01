import React from 'react';
import Home from "./Pages/Home";
import User from './Pages/User';
import Landing from "./Pages/Landing";

import NavBar from "./Components/NavBar";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {Widget, addResponseMessage} from 'react-chat-widget';

import SimpleForm from './Components/simple-chat-bot'

import 'react-chat-widget/lib/styles.css'
import "bootstrap/dist/css/bootstrap.min.css";

const handleNewUserMessage = (newMessage) =>{
  console.log(newMessage);
  addResponseMessage('Hola -> ' + newMessage);
}

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
      <div style={{display:'flex',justifyContent:'flex-end',padding:'0 1em'}}>    
          <SimpleForm/>
      </div>
    </Router>
  );
}
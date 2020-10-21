import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Auth0Provider } from "@auth0/auth0-react";
import { useAuth0 } from "@auth0/auth0-react";

import LoginButton from './Components/LoginButton'


function AuthApp(){

  const {isAuthenticated} = useAuth0();

  return(
    isAuthenticated ?
      <App />
    :
      <LoginButton/>
  );
  
}

ReactDOM.render(


  <Auth0Provider
    domain="dev-u66jbhx0.us.auth0.com"
    clientId="vSUs653f31jnK3skJSGPs9Y7ZfI31yQa"
    redirectUri={window.location.origin}
  >
    
    <AuthApp />
  
  </Auth0Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React, {useEffect, useState} from 'react';
import { Redirect, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";


export default function AuthenticatedRoutes({ component: Component, ...rest }) {

    const [authState, setAuthState] = useState(false);
    const [fetchingUser, setFetchingUser] = useState(true);
    const {isAuthenticated, isLoading} = useAuth0();

    
    useEffect(() => {

    }, [])


    return (
        <>
            {(isLoading === false) ?
                <Route
                    {...rest}
                    render={props => {
                        if (isAuthenticated){
                            return <Component {...props} /> 
                                
                        } else{
                            return <Redirect to={'/login'} />
                        }
                    }
                    }
                />
            :
                <p>Loading...</p>
            }
            
        </>
    );
  };
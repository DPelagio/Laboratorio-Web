import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../Components/LoginButton"
import LogOutButton from "../Components/LogOutButton"

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <>
      {(isLoading === false) ?
          (isAuthenticated) ? 
            <>
          
            <div>
              
              <h5 style={{ paddingRight: '1em' }}>{user.name} </h5>
              

            </div> 
            <LogOutButton/>
            </>
          : 
            <LoginButton/>
          
      :

        <div>Loading ...</div>

      }
    </>
  );
};

export default Profile;
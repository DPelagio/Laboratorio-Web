import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../Components/LoginButton"
import LogOutButton from "../Components/LogOutButton"

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  if(isAuthenticated){
    //console.log(user)
  }

  return (
    isAuthenticated ? 
      <>
      <LogOutButton/>
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
      </>
    : 
      <LoginButton/>
  );
};

export default Profile;
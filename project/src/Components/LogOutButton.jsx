import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

const LogOutButton = () => {
  const { logout } = useAuth0();

  return <Button onClick={() => logout({ returnTo: window.location.origin })}>LogOut</Button>;
};

export default LogOutButton;
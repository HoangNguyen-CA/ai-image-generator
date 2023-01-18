import { useAuth0 } from "@auth0/auth0-react";
import Profile from "../components/Profile/Profile";

const Auth = () => {
  const { loginWithRedirect, logout } = useAuth0();
  return (
    <>
      <Profile></Profile>
      <button onClick={() => loginWithRedirect()}>Log In</button>
      <button onClick={() => logout()}>Sign Out</button>
    </>
  );
};

export default Auth;

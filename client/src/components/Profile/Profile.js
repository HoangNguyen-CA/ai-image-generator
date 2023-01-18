import { useAuth0 } from "@auth0/auth0-react";
const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const getUserData = async () => {
    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: process.env.REACT_APP_AUTH0_API_IDENTIFIER,
          // scope: "read:current_user",
        },
      });

      const userDetailsByIdUrl = `${process.env.REACT_APP_BACKEND_BASEURL}/user`;

      const metadataResponse = await fetch(userDetailsByIdUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await metadataResponse.json();
      console.log(data, user);
    } catch (e) {
      console.log(e.message);
    }
  };

  if (!isAuthenticated) {
    return <div>Not Authenticated</div>;
  }

  return (
    <div>
      Logged In {user.name}
      <button onClick={getUserData}>Get Data</button>
    </div>
  );
};

export default Profile;

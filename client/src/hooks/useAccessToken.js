import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
function useAccessToken() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAccessToken() {
      setLoading(true);

      if (!isAuthenticated) {
        setAccessToken(null);
      } else {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: process.env.REACT_APP_AUTH0_API_IDENTIFIER,
            //scope
          },
        });
        setAccessToken(token);
      }
      setLoading(false);
    }

    fetchAccessToken();
  }, [isAuthenticated, getAccessTokenSilently]);

  return { accessToken, loading };
}

export default useAccessToken;

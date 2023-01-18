const { auth, requiredScopes } = require("express-oauth2-jwt-bearer");

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: "https://ai-image-express/",
  issuerBaseURL: `https://hoang-nguyen-ca.us.auth0.com/`,
});

module.exports = checkJwt;

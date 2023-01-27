const { auth, requiredScopes } = require("express-oauth2-jwt-bearer");

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: process.env.AUTH0_API_ID,
  issuerBaseURL: process.env.AUTH0_API_ISSUER,
});

module.exports = checkJwt;

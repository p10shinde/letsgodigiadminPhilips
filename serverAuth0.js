const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const cors = require('cors');
require('dotenv').config();
var request = require("request");
var jwt_decode = require("jwt-decode");

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
  throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file';
}


app.use(cors());

const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  aud: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});

const checkScopes = jwtAuthz([]);

  function getToken(callback){
    console.log('sending')
    var options = { method: 'POST',
      url: 'https://testing-app123.auth0.com/oauth/token',
      form : {
          "client_id":"dTmJ7GDsHrUwsXNtN0CeMVS0lK6SVmsQ",
          "client_secret":"ZzpTj-VS_RdzDP7F5ucBqARsHNjRvia4o8Kh0Lper2T8ISy9qyJrKszGEmr3GKG3",
          "audience":"https://testing-app123.auth0.com/api/v2/",
          "grant_type":"client_credentials"
      },
      headers: {'content-type': 'application/json' } 
     };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);
        callback(JSON.parse(body).access_token)
      });
  }

app.get('/api/private-scoped',checkJwt, checkScopes, function(req, res) {
  console.log(req.ip)
  try{
    var decoded = jwt_decode(req.headers.authorization.split(" ")[1]);
    console.log(decoded)
  }catch(ex){console.log(ex)}

  // getToken(function(scope_token){
  //   console.log(scope_token)
  //   var options = { 
  //     method: 'GET',
  //     url: process.env.AUTH0_AUDIENCE + 'users',
  //     headers: { 
  //       authorization: "Bearer " + scope_token,
  //      'content-type': 'application/json' 
  //     } 
  //   };

  //   request(options, function (error, response, body) {
  //     if (error) throw new Error(error);
  //       res.json({
  //         message: JSON.parse(body)
  //       });
  //   });
  // });
    res.json({
      message: "Done"
    });
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  return res.status(err.status).json({ message: err.message });
});

app.listen(3010);
console.log('Listening on http://localhost:3010');

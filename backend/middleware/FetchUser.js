const JWT = require("jsonwebtoken");
const dotenv = require("dotenv");

//Env from .env.local

// dotenv.config({ path: ".env.local" });
const secrectKey = 'wholetthedogout';

//Use a middleware function to req,res and next.
const fetchUser = (req, res, next) => {
  //Get the user credentials in essential router and add id to req object.
  const token = req.header('Auth-token');
  if (!token) {
    res.status(401).send({ error: "Enter valid token" });
  }
  try {
    // Tok is token.
    const TokData = JWT.verify(token, secrectKey);
    req.user = TokData.user;
    next();
  } catch (error) {
    //Catch An Error.
    console.error(error.message);
    res.status(401).send({ error: "Enter valid token" });
  }
};

module.exports = fetchUser;

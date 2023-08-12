  const express = require("express");
  const User = require("../models/User");
  const bcrypt = require("bcryptjs");
  const JWT = require("jsonwebtoken");
  const router = express.Router();
  const { validationResult, body } = require("express-validator");
  const dotenv = require("dotenv");
const fetchUser = require("../middleware/FetchUser");

  //Env from .env.local

  // dotenv.config({ path: ".env.local" });
  const secrectKey = 'wholetthedogout';

  //Route : 1 Create a User using : POST "/api/auth/createuser". For now Doesn't require auth. Login is not required.

  router.post(
    "/createuser",
    [
      body("name", "Enter a valid name").isLength({ min: 3 }),
      body("email", "Enter a valid email").isEmail(),
      body("password", "Password must be  8 characters").isLength({ min: 8 }),
    ],
    async (req, res) => {
      //Error Hunter.Send 400 if error.

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let success = false;
        return res.status(400).json({success, errors: errors.array() });
      }

      //Try and catchError to catch error.
      try {
        //new user or not. There must be Unique email for one and every user.
        let user = await User.findOne({ email: req.body.email });
        if (user) {
          let success = false;
          return res
            .status(400)
            .json({ success ,errors: "User already exists by this email." });
        }
        //Hash , salt in a password to make it secure.
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        //User creation
        user = await User.create({
          name: req.body.name,
          password: hashPassword,
          email: req.body.email,
        });

        //Creation of JWT authToken
        const data = {
          user: {
            id: user.id,
          },
        };

        const authToken = JWT.sign(data, secrectKey);

        // res.json(user);
        let success = true;
        res.json({success, authToken });
      } catch (error) {
        //Catch An Error.
    
        console.error(error.message);
        res.status(500).send("Some error occured");
      }
    }
  );

  // Route : 2 Create a User using : POST "/api/auth/login".Login is required.

  router.post(
    "/login",
    [
      body("email", "Enter a valid email").isEmail(),
      body("password", "Password cannot be blank").exists(),
    ],
    async (req, res) => {
      //Error Hunter.Send 400 if error.

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      //Destructure email and password .
      const { email, password } = req.body;
      try {
        //Find a User with given email
        let user = await User.findOne({ email });
        if (!user) {
          let success = flase;
          return res
            .status(400)
            .json({ success , errors: "Please enter valid credentials." });
        }

        //Auth a User with given password
        const authPassword = await bcrypt.compare(password, user.password);
        if (!authPassword) {
          let success = flase;
          return res
            .status(400)
            .json({success , errors: "Please enter valid credentials." });
        }

        const data = {
          user: {
            id: user.id,
          },
        };

        let success = true;
        const authToken = JWT.sign(data, secrectKey);
        res.json({ success , authToken });
      } catch (error) {
        //Catch An Error.
        
        console.error(error.message);
        res.status(500).send("Internal server error");
      }
    }
  );

  // Route : 3 Show User Data : POST "/api/auth/user".Login is required.
  router.post("/user" ,fetchUser, async (req, res) => {
 

   try {
    //fetch data using UserId.
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password")
res.send(user)
   } catch (error) {
     //Catch An Error.
     console.error(error.message);
     res.status(500).send("Internal server error");
   }

  });

  module.exports = router;


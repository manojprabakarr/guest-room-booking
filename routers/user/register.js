const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const users = require("../../models/user");
const jwt = require("jsonwebtoken");

//@route /register
//@desc   Register a new user

router.post(
  "/",
  [
    check("name", "Enter the name").not().isEmpty(),
    check("phno", "Enter phno").not().isEmpty(),
    check("email", "Enter the valid email id").isEmail(),
    check("password", "Enter the password of min 7 character long").isLength({
      min: 7,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ msg: "all fields required" });

    const { name, email, password, phno } = req.body;

    try {
      let user = await users.findOne({ email });
      if (user) return res.status(400).json({ msg: "user already exists" });

      user = new users({
        name,
        email,
        phno,
        password,
      });

      //decode the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      //generate access token
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.SECRET,
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: "internal server error" });
    }
  }
);

module.exports = router;

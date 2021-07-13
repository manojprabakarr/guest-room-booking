const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const userrents = require("../../models/userrent");

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
      return res.status(400).json({ error: errors.array() });

    const { name, email, password, phno } = req.body;

    try {
      let user = await userrents.findOne({ email });
      if (user) return res.status(400).send({ msg: "user already exists" });

      user = new userrents({
        name,
        email,
        phno,
        password,
      });

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
      res.status(500).send({ msg: "inetrnal server error" });
    }
  }
);

module.exports = router;

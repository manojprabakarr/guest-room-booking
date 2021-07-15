const router = require("express").Router();

const User = require("../../models/user");

const jwt = require("jsonwebtoken");

const { check, validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");

const auth = require("../../middleware/auth");

router.post(
  "/",
  [
    check("email", "Enter the valid email id").isEmail(),
    check("password", "Enter the password of min 7 character long").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: "invalid  data" });
      }

      const Match = await bcrypt.compare(password, user.password);
      if (!Match) {
        return res.status(400).json({ msg: "invalid data" });
      }

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
      res.status(500).send("internal server error");
    }
  }
);

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("internal server error");
  }
});

module.exports = router;

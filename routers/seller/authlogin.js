const router = require("express").Router();
const userrents = require("../../models/userrent");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const sellerAuth = require("../../middleware/sellerauth");

//@route /authlogin
//@desc This route is for the seller to login
//@access public

router.post(
  "/",
  [
    check("email", "Enter the valid email id").isEmail(),
    check("password", "Enter the password of min 7 character long").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ msg: "all feilds required" });

    const { email, password } = req.body;

    try {
      let user = await userrents.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: "invalid  email" });
      }

      const Match = await bcrypt.compare(password, user.password);
      if (!Match) {
        return res.status(400).json({ msg: "invalid password" });
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
      res.status(500).json({ msg: "internal server error" });
    }
  }
);
// @desc This route is for the seller to get login details
router.get("/", sellerAuth, async (req, res) => {
  try {
    const user = await userrents.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "internal server error" });
  }
});

module.exports = router;

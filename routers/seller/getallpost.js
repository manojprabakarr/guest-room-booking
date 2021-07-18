const router = require("express").Router();
const Rent = require("../../models/Rent");

//@route /getallpost
//@desc Get all posts for user

router.get("/", async (req, res) => {
  try {
    const users = await Rent.find({}).sort({
      date: -1,
    });
    res.json(users);
    return res.status(200).send("success");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

const router = require("express").Router();
const Rent = require("../../models/Rent");
const sellerAuth = require("../../middleware/sellerauth");

//posting using userid
router.post(
  "/",

  sellerAuth,

  async (req, res) => {
    try {
      Rentpost = new Rent({
        user: req.user.id,
        location: req.body.location,
        price_perday: req.body.price_perday,
        description: req.body.description,
        maximum_stay: req.body.maximum_stay,
        postimage: req.body.postimage,
      });

      await Rentpost.save();

      return res.status(200).json({ msg: "posted succesfully" });
    } catch (error) {
      console.error(error.message);
    }
  }
);

//updating using userid

router.put("/:id", sellerAuth, async (req, res) => {
  // build Guest object
  const guestFields = {
    location: req.body.location,
    description: req.body.description,
    price_perday: req.body.price_perday,
    maximum_stay: req.body.maximum_stay,
    postimage: req.body.postimage,
  };

  try {
    let rent = await Rent.findById(req.params.id);
    if (!rent) return res.status(404).json({ msg: "Guest not found" });

    // Make sure user owns the guest
    if (rent.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorised" });
    }
    rent = await Rent.findByIdAndUpdate(
      req.params.id,
      { $set: guestFields },
      { new: true }
    );
    res.send(rent);
  } catch (err) {
    console.errors(err.message);
    res.status(500).json({ msg: "internal server error" });
  }
});

//delete using userid

router.delete("/:id", sellerAuth, async (req, res) => {
  try {
    let rent = await Rent.findById(req.params.id);
    if (!rent) return res.status(404).json({ msg: "Guest not found" });

    // check if user owns the guest
    if (rent.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorised" });
    }
    await Rent.findByIdAndRemove(req.params.id);
    res.send("Guest Removed successfully");
  } catch (err) {
    console.error(err.message);
  }
});

// getting data using user_id

router.get("/", sellerAuth, async (req, res) => {
  try {
    const rents = await Rent.find({ user: req.user.id });
    res.json(rents);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "internal server error" });
  }
});

module.exports = router;

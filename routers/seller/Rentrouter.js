const router = require("express").Router();
const Rent = require("../../models/Rent");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const auth = require("../../middleware/auth");

//image upload using multer
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./routers/seller/uploads/");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

//posting using userid
router.post("/", auth, upload.single("postimage"), async (req, res) => {
  try {
    Rentpost = await new Rent({
      user: req.user.id,
      location: req.body.location,
      price_perday: req.body.price_perday,
      description: req.body.description,

      postimage: req.file.originalname,
    });

    await Rentpost.save();

    return res.status(200).json({ msg: "posted succesfully" });
  } catch (error) {
    console.error(error.message);
  }
});

//updating using userid

router.put("/:id", auth, upload.single("postimage"), async (req, res) => {
  // build Guest object
  const guestFields = {
    location: req.body.location,
    description: req.body.description,
    price_perday: req.body.price_perday,
    postimage: req.file.originalname,
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
    res.status(500).send("Server Error");
  }
});

//delete using userid

router.delete("/:id", auth, async (req, res) => {
  try {
    let rent = await Rent.findById(req.params.id);
    if (!rent) return res.status(404).json({ msg: "Guest not found" });

    // check if user owns the guest
    if (guest.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorised" });
    }
    await Rent.findByIdAndRemove(req.params.id);
    res.send("Guest Removed successfully");
  } catch (err) {
    console.errors(err.message).json("Server Error");
  }
});

module.exports = router;

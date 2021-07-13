const router = require("express").Router();
const Rent = require("../../models/Rent");
const multer = require("multer");

//image upload using multer
const storage = multer.diskStorage({
  destination: (req, res, callback) => {
    callback(null, "./client/public/uploads");
  },
  filename: (req, res, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("postimage"), async (req, res) => {
  const { location, price_perday, description, postimage } = req.body;

  try {
    Rentpost = await new Rent({
      location,
      price_perday,
      description,
      postimage,
    });

    await Rentpost.save();

    return res.status(200).json({ msg: "posted succesfully" });
  } catch (error) {
    console.error(error.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const post = await Rent.find({}).sort({
      date: -1,
    });
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

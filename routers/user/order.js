const router = require("express").Router();
const Order = require("../../models/order");
const Rent = require("../../models/Rent");
const auth = require("../../middleware/auth");

//@route  /order
//@desc post orders

router.post("/", auth, async (req, res) => {
  let rents = Rent.findById();
  if (rents.maximum_stay > dates)
    return res.status(400).json({
      message: "You can't rent this movie for more than " + dates + " days",
    });
  s;

  try {
    order = await Order({
      product: req.body.product,
      guestname: req.body.guestname,
      guestphno: req.body.guestphno,

      startdate: req.body.startdate,
      enddate: req.body.enddate,
    });
    const dates = req.body.startdate - req.body.enddate;

    await order.save();
    return res.status(200).json({ msg: "posted succesfully" });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;

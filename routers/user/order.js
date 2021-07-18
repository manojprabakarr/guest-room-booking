const router = require("express").Router();
const Order = require("../../models/order");

const auth = require("../../middleware/auth");

//@route  /order
//@desc post orders
router.post("/", auth, async (req, res) => {
  try {
    order = await Order({
      product: req.body.product,
      guestname: req.body.guestname,
      guestphno: req.body.guestphno,
      noofguests: req.body.noofguests,
      startdate: req.body.startdate,
      enddate: req.body.enddate,
    });

    await order.save();
    return res.status(200).json({ msg: "posted succesfully" });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;

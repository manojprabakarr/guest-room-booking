const router = require("express").Router();
const Order = require("../../models/order");
const sellerAuth = require("../../middleware/sellerauth");
const auth = require("../../middleware/auth");

router.post("/", auth, async (req, res) => {
  try {
    order = await Order({
      productid: req.body.productid,
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

router.get("/", sellerAuth, async (req, res) => {
  try {
    order = await Order.findOne({ productid });

    if (productid === req.user.id) {
      res.json(order);
    }
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;

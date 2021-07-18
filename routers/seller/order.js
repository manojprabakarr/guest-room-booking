const router = require("express").Router();
const Order = require("../../models/order");
const sellerAuth = require("../../middleware/sellerauth");
const auth = require("../../middleware/auth");

//@route  /order
//@desc post orders
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

//@route  /order
//@desc get all orders and show to particular seller

router.get("/", auth, async (req, res) => {
  try {
    const orders = await Order.find({});

    return res.status(200).json({ orders });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

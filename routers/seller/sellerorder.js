const router = require("express").Router();
const Order = require("../../models/order");
const sellerAuth = require("../../middleware/sellerAuth");

//@route  /order
//@desc get all orders and show to particular seller

router.get("/", sellerAuth, async (req, res) => {
  try {
    const orders = await Order.find({});

    if ((orders.product = req.user.id)) return res.json({ orders });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

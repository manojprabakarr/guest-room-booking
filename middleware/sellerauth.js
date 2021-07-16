const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  //get token from header
  const token = req.header("x-auth-token");

  //check the token
  if (!token) {
    return res.status(401).json({ msg: "no token ,invalid authorization" });
  }

  try {
    const decode = jwt.verify(token, process.env.SECRET);
    req.user = decode.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "token is not valid" });
  }
};

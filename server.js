const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

//database
const Connectdb = require("./helper/db");

//config files
require("dotenv").config({
  path: "./config/config.env",
});

const app = express();

app.use(express.json());

//database connection
Connectdb();

//dev middleware
if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
    })
  );
  app.use(morgan("dev"));
}

//load routes
app.use("/guestpost", require("./routers/seller/Rentrouter"));
app.use("/userregister", require("./routers/user/register"));
app.use("/userlogin", require("./routers/user/login"));
app.use("/authregister", require("./routers/seller/authregister"));
app.use("/authlogin", require("./routers/seller/authlogin"));

app.use((req, res) => {
  res.status(404).json({
    success: false,
    msg: "Page not founded",
  });
});
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`server started ${PORT}`);
});

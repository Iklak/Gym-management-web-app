require("dotenv").config();
const express = require("express");
const connectDataBase = require("./config/db");
const cookieParse = require("cookie-parser");
const cors = require("cors");

const gymRoutes = require("./routes/gym.routes");
const memberShipRoutes = require("./routes/membership.routes");
const memberRoutes = require("./routes/member.routes");

const app = express();
connectDataBase("mongodb://127.0.0.1:27017/gymMangementSystem");

const port = process.env.PORT || 4000;
app.use(express.json());
app.use(cookieParse());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("<h1>welcome gym website</h1>");
});

app.use("/api/auth", gymRoutes);
app.use("/api/plans", memberShipRoutes);
app.use("/api/member", memberRoutes);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

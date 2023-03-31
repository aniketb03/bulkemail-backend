const express = require("express");
const router = require("./routes/route.js");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/user", router);

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));

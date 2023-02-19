const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/authRouter");
const usersRouter = require("./routes/usersRoute");
const connectDB = require("./configs/db");

const app = express();
const port = 4000;

connectDB();

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/users", usersRouter);

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);

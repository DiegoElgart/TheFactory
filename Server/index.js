const express = require("express");
const cors = require("cors");
const auth = require("./middleware/authMiddleware");
const authRouter = require("./routes/authRouter");
const usersRouter = require("./routes/usersRoute");
const departmentRouter = require("./routes/departmentRouter");
const employeeRouter = require("./routes/employeeRouter");
const shiftRouter = require("./routes/shiftRouter");
const cookieParser = require("cookie-parser");
//const actionsMiddleware = require("./middleware/actionsMiddleware");

const connectDB = require("./configs/db");

const app = express();
const port = 4000;

connectDB();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/users", auth, usersRouter);
app.use("/employee", auth, employeeRouter);
app.use("/dept", auth, departmentRouter);
app.use("/shift", auth, shiftRouter);

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);

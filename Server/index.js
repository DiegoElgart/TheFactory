const express = require("express");
const cors = require("cors");
const auth = require("./middleware/authMiddleware");
const checkMaxActionsById = require("./middleware/actionsMiddleware");
const authRouter = require("./routes/authRouter");
const usersRouter = require("./routes/usersRoute");
const departmentRouter = require("./routes/departmentRouter");
const employeeRouter = require("./routes/employeeRouter");
const shiftRouter = require("./routes/shiftRouter");
const cookieParser = require("cookie-parser");
const connectDB = require("./configs/db");

const app = express();
const port = 4000;

connectDB();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/auth", authRouter);
//app.use(checkMaxActionsById);
//app.use("/users", auth, usersRouter);

app.use("/users", usersRouter);
app.use("/employee", employeeRouter);
app.use("/dept", departmentRouter);
app.use("/shift", shiftRouter);

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);

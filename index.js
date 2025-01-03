require("dotenv").config()
const express = require("express")
const app = express()
const port = process.env.PORT;
const cors = require("cors");
const path = require("path")
const _dirname = path.resolve();
const ConnectDB = require("./config/DB");
const router = require("./routes/userRoutes");
const another = require("./routes/anotherWorkspaceRoutes")
const cookieParser = require("cookie-parser");

const corsOption = {
    origin : "http://localhost:5173",
    methods: "GET, POST, DELETE, PUT, PATCH, HEAD",
    credentials: true,
}

app.use(cors(corsOption))
app.use(cookieParser());
app.use(express.json());
app.use(express.text());
app.use("/api/user/", router);
app.use("/api/user/", another);


app.listen(port,()=>{
  console.log(`server is listening on port ${port}`);
})



ConnectDB();
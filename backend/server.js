const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require('./config/db');
require("dotenv").config();
const loggerMiddleware = require("./middlewares/loggerMiddleware");
app.use(express.json());
app.use(cors({origin: "*"}));



const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB Atlas!"))
  .catch(err => console.error("Connection error:", err));

app.use("/auth", require("./routes/authRoutes"));
app.use("/purchase", require("./routes/purchaseRoutes"));
app.use("/transfers", require("./routes/transferRoutes"));
app.use("/assignments", require("./routes/assignmentRoutes"));
app.use("/expenditure", require("./routes/expenditureRoutes"));
app.use("/dashboard", require("./routes/dashboardRoutes"));

app.get("/",(req,resp) => {
  resp.send("welcome to military base")
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> 
    console.log(`Server runningg ON ${PORT}`)
);




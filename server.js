require("dotenv").config();

const express = require("express")
const mongoose = require("mongoose")
// common middlewares used in express.
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/user.js");


const app = express();

// DB Connetion....
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log("DB CONNECTED");
}).catch(() => {
    console.log("OOPS...DB GOT STUCK")
});

// MiddleWares....
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())




// MY ROUTES

app.use("/api",authRoutes);
app.use("/api",userRoutes);



if(process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'));
}

// Starting Server
app.listen(process.env.PORT || 8000, () => {
    console.log("Server successfully started at port 8000")
});
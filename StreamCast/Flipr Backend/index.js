const dotenv = require("dotenv")
const cors = require("cors");
const mongoose = require("mongoose")
const express = require("express")

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require('express-session');
const passport = require('passport');
const passportSetup = require('./middleware/authenticate');

const app = express();

// Import all Router 
const authRoutes =  require('./routes/auth')
const podcastRoutes =  require('./routes/podcast')
const playlistRoutes =  require('./routes/playlist')
const fileuploadRoutes =  require('./routes/fileupload')

dotenv.config({path: './config.env'})

require('./db/conn');

var corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    optionsSuccessStatus: 200,
};

// linking the router file
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(
    express.urlencoded({
        limit: "50mb",
        extended: true,
        parameterLimit: 1000000,
    })
);
app.use(cookieParser());


// Api Routes
app.get('/', (req, res) => {
    res.send("hello from the server");
})
app.use('/api/auth', authRoutes);
app.use('/api/podcast', podcastRoutes);
app.use('/api/playlist', playlistRoutes);
app.use('/api/upload', fileuploadRoutes);





const PORT = process.env.PORT || 3001;

// app.set('trust proxy', 1);
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    proxy: true,
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: 'process.env.SECRET',
        secure: true,
        httpOnly: false,
        sameSite: "none",
    }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(require("./routes/auth"));
app.use(require("./routes/podcast"));

// app.get('/about', (req, res) => {
//     res.send("hello from the server about");
// })
// app.get('/signup', (req, res) => {
//     res.send("hello from the server register");
// })
// app.get('/signin', (req, res) => {
//     res.send("hello from the server login");
// })
// app.post("/register2", (req, res) => {
//   console.log(req.body)
//   res.json({ message: req.body });
// });


app.listen(`${PORT}`, ()=>{
    console.log(`Server is running on port number ${PORT}`);
})
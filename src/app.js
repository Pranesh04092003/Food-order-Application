require('dotenv').config(); // Load environment variables at the very start

const express = require('express');
const hbs = require('hbs');
const route = require('./routers/main');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const { handlebars } = require('hbs');
require("./handlebar"); // Custom handlebars setup

const app = express();
app.use(fileUpload());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('', route);
// static folder
app.use("/static", express.static("public"));
// template engine
app.set("view engine", 'hbs');
app.set("views", 'views');
hbs.registerPartials('views/partials');

const PORT = 5656;

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected..");
}).catch(err => {
    console.error("Error connecting to MongoDB:", err);
});

app.listen(PORT, () => {
    console.log(`Server is started on http://localhost:${PORT}`);
});

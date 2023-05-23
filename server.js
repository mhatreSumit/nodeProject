const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path');
const cors = require('cors');
const app = express();
// const dbConfig = require('./config/dbConfig');
app.options('*', cors());
app.use(cors());
require('dotenv').config({ path: path.join(__dirname, '.env') });

//body-parser
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


//routes
const userRouter = require('./routes/userRoutes')
app.use('/', userRouter)

//db connection
mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false, // Don't build indexes
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    //process.exit();
});

app.listen(5000, () => {
    console.log("Server is listening on port 5000");
});

module.exports = app;
var path = require("path");
var express = require("express");
var app = express();

var { Pool } = require("pg");

const login  = require('./modules/login.js');
const logout = require('./modules/logout.js');
const verify = require('./modules/loginVerified.js');

var session = require('express-session');

require('dotenv').config();

// DATABASE Setup
var db_url = process.env.DATABASE_URL;
var pool = new Pool({connectString: db_url});

// Session Setup
app.use(session({
    secret: 'bacon-is-great-for-all-ocasions',
    resave: false,
    saveUninitialized: true
}));

// Support for JSON-encoded bodies
app.use(express.json());

// Support URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Where the site is to be HOSTed
const localPORT = 5000;
app.set('port', (process.env.PORT || localPORT));

// Static location of the PUBLIC directory
app.use(express.static(path.join(__dirname, "public")));

// To view all middleware function for requests
app.use(verify.logVerifyRequest);

// Paths
app.post('/login', login.userLogin);
app.post('/logout', logout.userLogout);

// Middleware function methods
app.get('/getServerTime', verify.verifyLogin, verify.getServerTimeStamp);

// Start the SERVER listening
app.listen(app.get('port'), function() {
    console.log('Server is listening on PORT: ' + app.get('port'));
});
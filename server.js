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
// app.use(logRequest);
app.use(verify.logVerifyRequest);

// Paths
// app.post('/login',  userLogin);
app.post('/login', login.userLogin);
// app.post('/logout', userLogout);
app.post('/logout', logout.userLogout);

// Middleware function methods
// app.get('/getServerTime', verifyLogin, getServerTimeStamp);
app.get('/getServerTime', verify.verifyLogin, verify.getServerTimeStamp);

// Start the SERVER listening
app.listen(app.get('port'), function() {
    console.log('Server is listening on PORT: ' + app.get('port'));
});


/***************************************************************************
*   Modules
***************************************************************************/

function userLogin(request, response) {
    console.log("userLogin started");
    
    // access granted, default FALSE
    var results = { success: false };
    
    // check user input NAME and PASSWORD
    if(request.body.username == "admin" && request.body.password == "password") {
        
        // Transferr to SESSION variable
        request.session.user = request.body.username;
        
        // Change access to granted
        results = { success: true };
    };
    console.log("userLogin ended");
    console.log(results);
    
    response.json(results);
};

function userLogout(request, response) {
    console.log("userLogout started");
    
    // Is the user logged out, default FALSE
    var results = { success: false };
    
    // Verify that the user is logged out
    if(request.session.user) {
        
        // DESTROY USER Session Variables
        request.session.destroy();
        
        // Change verification to user being logged out to TRUE
        results = { success: true };
    };
    console.log("userLogout ended");
    console.log(results);
    
    response.json(results);
};

function getServerTimeStamp(request, response) {
    console.log("getServerTimeStamp started");
    
    // Get the Serve time
    var timeStamp = new Date();
    
    // Add time to results
    var results = { success: true, timeStamp: timeStamp };
    
    // return results
    response.json(results);
};

function verifyLogin(request, response, next) {
    console.log("verifyLogin started");
    
    // check to see if user is logged in
    if(request.session.user) {
        console.log("verifyLogin pass to NEXT()");
        
        // Pass results to the NEXT function
        next();
        
    }else{
        
        // change verification and generate unauthorized status message
        var results = { success: false, message: "Unautorized User - Access Denied" };
        
        // Send back with 401 status
        response.status(401).json(results);
    }
};

function logRequest(request, response, next) {
    console.log("logRequest started");
    
    // confirm that the URL was passed correctly
    console.log("Received a request for: " + request.url);
    
    // continue on to the NEXT function
    console.log("logRequest pass to NEXT()");
    
    next();
};
const path = require("path");
const express = require("express");
var app = express();

const { Pool } = require("pg");

// const login  = require('./modules/login.js');
// const logout = require('./modules/logout.js');
// const verify = require('./modules/loginVerified.js');

var session = require('express-session');

require('dotenv').config();

// DATABASE Setup
const db_url = process.env.DATABASE_URL;
const pool = new Pool({connectString: db_url});

// Session Setup
app.use(session({
    secret: 'bacon-is-great',
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
app.post('/login',  userLogin);
app.post('/logout', userLogout);

// Middleware function methods
app.get('/getServerTime', verifyLogin, getServerTimeStamp);

// Start the SERVER listening
app.listen(app.get('port'), function() {
    console.log('Server is listening on PORT: ' + app.get('port'));
});


/***************************************************************************
*   Modules
***************************************************************************/

function userLogin(request, response) {
    
    // access granted, default FALSE
    var result = { success: false };
    
    // check user input NAME and PASSWORD
    if(request.body.userName == "admin" && request.body.userPass == "password") {
        
        // Transferr to SESSION variable
        request.session.user = request.body.userName;
        
        // Change access to granted
        result = { success: true };
    };
    
    response.json(result);
};

function userLogout(request, response) {
    
    // Is the user logged out, default FALSE
    var results = { success: false };
    
    // Verify that the user is logged out
    if(request.session.user) {
        
        // DESTROY USER Session Variables
        request.session.destroy();
        
        // Change verification to user being logged out to TRUE
        results = { success: true };
    };
    
    response.json(results);
};

function getServerTimeStamp(request, response) {
    
    // Get the Serve time
    var timeStamp = new Date();
    
    // Add time to results
    var results = { success: true, timeStamp: timeStamp };
    
    // return results
    response.json(results);
};

function verifyLogin(request, response, next) {
    
    // check to see if user is logged in
    if(request.session.user) {
        
        // Pass results to the NEXT function
        next();
        
    }else{
        
        // change verification and generate unauthorized status message
        var results = { success: false, message: "Unautorized User - Access Denied" };
        
        // Send back with 401 status
        response.status(401).json(results);
    }
};

function logVerifyRequest(request, response, next) {
    
    // confirm that the URL was passed correctly
    console.log("Received a request for: " + request.url);
    
    // continue on to the NEXT function
    next();
};
// verifies the user login
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

// Verifies that user login request
function logVerifyRequest(request, response, next) {
    console.log("logVerifyRequest started");
    
    // confirm that the URL was passed correctly
    console.log("Received a request for: " + request.url);
    
    // continue on to the NEXT function
    console.log("logVerifyRequest pass to NEXT()");
    
    next();
};

// Retrieves a TIMESTAMP from the SERVER
function getServerTimeStamp(request, response) {
    console.log("getServerTimeStamp started");
    
    // Get the Serve time
    var timeStamp = new Date();
    
    // Add time to results
    var results = { success: true, timeStamp: timeStamp };
    
    // return results
    response.json(results);
};

module.exports = {
    verifyLogin: verifyLogin,
    logVerifyRequest: logVerifyRequest,
    getServerTimeStamp: getServerTimeStamp
};
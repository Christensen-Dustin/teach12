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

function getServerTimeStamp(request, response) {
    
    // Get the Serve time
    var timeStamp = new Date();
    
    // Add time to results
    var results = { success: true, timeStamp: timeStamp };
    
    // return results
    response.json(results);
};

module.exports = {
    verifyLogin: verifyLogin,
    getServerTimeStamp: getServerTimeStamp
};
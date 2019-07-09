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

module.exports = {
    userLogout: userLogout
};
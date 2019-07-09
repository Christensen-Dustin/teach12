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

module.exports = {
    userLogout: userLogout
};
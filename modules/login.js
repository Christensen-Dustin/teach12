function userLogin(request, response) {
    
    // access granted, default FALSE
    var result = { success: false };
    
    // check user input NAME and PASSWORD
    if(request.body.username == "admin" && request.body.password == "password") {
        
        // Transferr to SESSION variable
        request.session.user = request.body.username;
        
        // Change access to granted
        result = { success: true };
    };
    
    response.json(result);
};

module.exports = {
    userLogin: userLogin
};
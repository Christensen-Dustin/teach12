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

module.exports = {
    userLogin: userLogin
};
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

module.exports = {
    userLogin: userLogin
};
// Function to login the USER
function login() {
    
    // Get input from user
    var userName = $("#name").val();
    var userPass = $("#password").val();
    
    // generate PARAMS for POST
    var params = { userName: userName, userPass: userPass };
    
    // Send the POST
    $.post("/login", params, function(results) {
        
        // check to see if user is logged-in
        if(results && results.success) {
            
            // clear DIV - middleLog
            // clearSection("middlLog");
            
            // Successful Login
            $("#middleLog").text("You are successfully logged in.");    
        } else {
            
            // clear DIV - middleLog
            // clearSection("middlLog");
            
            // Unsuccessful login
            $("#middleLog").text("You have not successfully logged in.");
        }
    });   
};

// Function to logout the USER
function logout() {
    
    // POST to URL - /logout
    $.post("/logout", function(results) {
        
        // Check to see if the user if logged-out
        if(results && results.success) {
            
            // clear DIV - middleLog
            // clearSection("middleLog");
            
            // Successful logout message
            $("middleLog").text("Your are successfully Logged out.");
        } else {
            
            // clear DIV - middleLog
            // clearSection("middleLog");
            
            // Unsuccessful logout message
            $("middleLog").text("You have not successfully logged out.");
        }
    });
};

// Timestamp Function
function getServerTimeStamp() {
    
    // Send the GET request
    $.get("/getServerTime", function(results) {
        
        // check if logged in and send Time Stamp
        if(results.success) {
            
            // clear DIV - timeStamp
            // clearSection("timeStamp");
            
            // Display the Time Stamp
            $("timeStamp").text("Server Time Stamp: " + results.timeStamp);
        } else {
            
            // clear DIV - timeStamp
            // clearSection("timeStamp");
            
            // Display logged out message
            $("timeStamp").text("Received a RESPONSE, though it was not successful.");
        }
    }).fail(function(results) {
        
        // clear DIV - timeStamp
        // clearSection("timeStamp");
        
        // Fail attempt to retreive the server time stamp
        $("timeStamp").text("Could not retrieve TIMESTAMP from SERVER.");
    });
}


// Clear APPENDs of DIV
function clearSection(sectionID) {
    
    var select = document.getElementById(sectionID);
    
    while (select.firstChild) {
        select.removeChild(select.firstChild);
    }
    
    return;
}




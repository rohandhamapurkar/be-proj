let otplib = require("otplib");

module.exports.policies= [Services.middleware.isLoggedIn,Services.middleware.isUser];
module.exports.routes = {
    'GET /generateOtpStream': async (req,res) => {
        otplib.authenticator.options = {
            step: 5 //to be changed to 30
        }
        
        const secret = otplib.authenticator.generateSecret();
        res.json({ok:true,secret});
    }
}
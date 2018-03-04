let otplib = require("otplib");

module.exports.policies= [Services.middleware.isLoggedIn,Services.middleware.isUser];
module.exports.routes = {
    'GET /generateOtpStream': async (req,res) => {
        otplib.authenticator.options = {
            step: 30 //to be changed to 30
        }
        
        const secret = otplib.authenticator.generateSecret();
        await Services.totp.saveSecret(req.auth.id, secret);
        res.json({ok:true,secret});
    }
}
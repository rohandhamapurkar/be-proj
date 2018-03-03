let otplib = require("otplib");

module.exports.policies= [Services.middleware.isLoggedIn,Services.middleware.isUser];
module.exports.routes = {
    'GET /otp': async (req,res) => {
        otplib.authenticator.options = {
            step: 5
        }
        const secret = otplib.authenticator.generateSecret();
        res.json({ok:true,secret});
    },
    'POST /verify': async(req,res) => {
        otplib.authenticator.options = {
            step: 5
        }
        res.json(otplib.authenticator.check(req.body.token, req.body.secret));
    },
}
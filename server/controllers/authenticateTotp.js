let otplib = require("otplib");

module.exports.policies= [Services.middleware.isSessionId];
module.exports.routes = {
    'POST /verifyOtp': async(req,res) => {
        otplib.authenticator.options = {
            step: 5 //to be changed to 30
        }
        res.json({ok:true,authentication:otplib.authenticator.check(req.body.token, req.body.secret)});
    },
}
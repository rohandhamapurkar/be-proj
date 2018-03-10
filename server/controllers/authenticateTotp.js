let otplib = require("otplib");

module.exports.policies= [Services.middleware.isSessionId];
module.exports.routes = {
    'POST /verifyOtp': async(req,res) => {
        otplib.authenticator.options = {
            step: 30
        }
        let result = await Services.totp.getSecret(req.body.userId);
        res.json({ok:true,authentication:otplib.authenticator.check(req.body.token, result.secret)});
    },
}
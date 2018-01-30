let otplib = require("otplib");
otplib.authenticator.options = {
    step: 5,
}
module.exports.routes = {
    'POST /user/login': async (req, res) => {
        if (req.body && req.body.user && req.body.user.hasOwnProperty('id') && req.body.user.hasOwnProperty('password')) {
            req.body.user.password = await Services.auth.hashPassword(req.body.user.password);
            let result = await Services.auth.checkUserExists(req.body.user);
            if (result.ok) {
                let token = await Services.auth.issueToken({ id: result.user.id , accountType: result.user.accountType });
                res.json({ ok: true, token: token });
            } else {
                res.json(result);
            }
        } else {
            res.json({ ok: false, message: "Missing Params" });
        }
    },
    'POST /sudoAdmin/signup': async (req, res) => {
        log(req.body);
        if (req.body && req.body.user && req.body.user.hasOwnProperty('id') && req.body.user.hasOwnProperty('password')) {
            const pwHash = Services.auth.hashPassword(req.body.user.password);
            res.json(await Services.sudoAdmin.registerAdmin({ id: req.body.user.id.toLowerCase(), password: pwHash}));
        } else {
            res.json({ ok: false, message: 'missing params id || pw || name' });
        }
    },
    //test Time based OTP
    'GET /otp': async (req,res) => {
        const secret = otplib.authenticator.generateSecret();
        res.json({ok:true,secret});
    },
    'POST /verify': async(req,res) => {
        res.json(otplib.authenticator.check(req.body.token, req.body.secret));
    }

}
module.exports.policies = [Services.middleware.isLoggedIn,Services.middleware.isSudoAdmin];
module.exports.routes = {
    'POST /createUser': async (req, res) => {
        log(req.body);
        if (req.body && req.body.user && req.body.user.hasOwnProperty('id') && req.body.user.hasOwnProperty('password')) {
            const pwHash = Services.auth.hashPassword(req.body.user.password);
            res.json(await Services.user.registerUser({ id: req.body.user.id.toLowerCase(), password: pwHash}));
        } else {
            res.json({ ok: false, message: 'missing params id || pw || name' });
        }
    }
}
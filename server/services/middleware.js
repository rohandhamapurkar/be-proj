module.exports = {
    isLoggedIn: async (req, res, next) => {
        if (req.headers.hasOwnProperty('auth') && typeof req.headers.auth == 'string') {
            let verification = await Services.auth.verifyToken(req.headers.auth);
            if (!!verification) {
                req.auth = verification;
                next();
            } else {
                res.status = 401;
                res.json({ ok: false, message: "Invalid Token" });
            }
        } else {
            res.json({ ok: false, message: "Missing params" });
        }
    },
    isSessionId: async (req,res,next) => {
        if (req.headers.hasOwnProperty('sessionId') && typeof req.headers.sessionId == 'string') {
            let verification = await Services.auth.verifyToken(req.headers.auth);
            if (!!verification) {
                req.auth = verification;
                next();
            } else {
                res.status = 401;
                res.json({ ok: false, message: "Invalid Token" });
            }
        } else {
            res.json({ ok: false, message: "Missing params" });
        }
    },
    isUser: async (req, res, next) => {
        if (req.auth.hasOwnProperty('accountType') && req.auth.accountType == 10) {
            next();
        } else {
            res.json({ ok: false, message: "You are not a User." });
        }
    },
    isSudoAdmin: async (req, res, next) => {
        if (req.auth.hasOwnProperty('accountType') && req.auth.accountType == 1) {
            next();
        } else {
            res.json({ ok: false, message: "You are not an Admin dont try to be one." });
        }
    }
}
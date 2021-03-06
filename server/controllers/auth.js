module.exports.routes = {
    'POST /user/login': async (req, res) => {
        if (req.body && req.body.user && req.body.user.hasOwnProperty('id') && req.body.user.hasOwnProperty('password')) {
            req.body.user.password = await Services.auth.hashPassword(req.body.user.password);
            let result = await Services.auth.checkUserExists(req.body.user);
            if (result.ok) {
                let token = await Services.auth.issueToken({ id: result.user.id , accountType: result.user.accountType });
                res.json({ ok: true, token: token, accountType: result.user.accountType });
            } else {
                res.json(result);
            }
        } else {
            res.json({ ok: false, message: "Missing Params" });
        }
    },
    'POST /createUser': async (req, res) => {
        if (req.body && req.body.user && req.body.user.hasOwnProperty('id') && req.body.user.hasOwnProperty('password')) {
            let imageData = null;
            const pwHash = Services.auth.hashPassword(req.body.user.password);
            req.body.user.password = pwHash;
            req.body.user.accountType = 10;
            req.body.user.id = req.body.user.id.toLowerCase();
            if(req.body.user.hasOwnProperty('embedImage')){
                imageData = req.body.user.embedImage;
                delete req.body.user.embedImage;
            }
            res.json(await Services.auth.registerUser(req.body.user));
            if(imageData != null){
                let result = await Services.embeddedImage.generateImageBase64(imageData,{id:req.body.user.id,accountType:10});
                console.log(result)
            }
        } else {
            res.json({ ok: false, message: 'missing params id || pw || name' });
        }
    },
    'POST /createDev': async (req, res) => {
        if (req.body && req.body.user && req.body.user.hasOwnProperty('id') && req.body.user.hasOwnProperty('password')) {
            const pwHash = Services.auth.hashPassword(req.body.user.password);
            req.body.user.password = pwHash;
            req.body.user.accountType = 1;
            req.body.user.id = req.body.user.id.toLowerCase();
            res.json(await Services.auth.registerUser(req.body.user));
        } else {
            res.json({ ok: false, message: 'missing params id || pw || name' });
        }
    },
    'POST /verifyApiKey': async (req, res) => {
        console.log(req.body)
        if (req.body && req.body.key){
            let result = await Services.auth.verifyApiKey(req.body.key);
            if (result.ok) {
                let token = await Services.auth.issueToken({ id: result.resp.id });
                res.json({ ok: true, token: token });
            } else {
                res.json(result);
            }
        } else {
            res.json({ ok: false, message: "Missing Params" });
        }
    },
    'GET /userExists': async (req,res) => {
        if (req.headers && req.headers.hasOwnProperty('userid') && req.headers.hasOwnProperty('sessionid')) {
            let result = await Services.auth.checkUserExists({id:req.headers.userid, accountType:10});
            if (result.ok) {
                let update = {
                    sessionId : req.headers.sessionid,
                    authentication : false
                };
                await Services.auth.saveSession(req.headers.userid,update);
                delete update;
                res.json({ok: true});
            } else {
                res.json({ok: false,message:"No such user"});
            }
        } else {
            res.json({ ok: false, message: "Missing Params" });
        }
    },
    'GET /getAuthState': async (req,res) => {
        if(req.headers && req.headers.hasOwnProperty('sessionid')){
            res.json(await Services.auth.getAuthState(req.headers.sessionid));
        } else {
            res.json({ok:false,message:"Missing params"});
        }
    }
}

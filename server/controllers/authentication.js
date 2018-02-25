module.exports.routes = {
    'POST /verifyApiKey': async (req, res) => {
        if (req.body && req.body.key){
            let result = await Services.authentication.verifyApiKey(req.body.key);
            if (result.ok) {
                let token = await Services.auth.issueToken({ id: result.resp.id });
                res.json({ ok: true, token: token });
            } else {
                res.json(result);
            }
        } else {
            res.json({ ok: false, message: "Missing Params" });
        }
    }
}
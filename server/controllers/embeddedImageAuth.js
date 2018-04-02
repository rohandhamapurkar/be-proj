module.exports.policies = [Services.middleware.isSessionId];
module.exports.routes = {
    'POST /authenticateEmbeddedImage': async(req,res) => {
        let result = await Services.embeddedImage.authenticateImage(req.body.image,req.body.userId,req.headers.sessionid)
        res.json(result);
    }
}
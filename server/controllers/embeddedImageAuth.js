module.exports.policies = [Services.middleware.isSessionId];
module.exports.routes = {
    'POST /authenticateEmbeddedImage': async(req,res) => {
        let result = Services.embeddedImage.authenticateImage(req.body.image,req.body.userId)
        res.json(result);
    }
}
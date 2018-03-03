module.exports.policies= [Services.middleware.isLoggedIn,Services.middleware.isUser];
module.exports.routes = {
    'POST /generateImage': async (req,res) => {
        let result = await Services.embeddedImage.generateImageBase64(req.body.embedImage,req.auth);
        res.json(result);
    },
    'GET /generatedImage': async (req,res) => {
        let result = await Services.embeddedImage.getImageBase64(req.auth);
        res.json(result);
    }
}
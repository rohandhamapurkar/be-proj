module.exports.policies= [Services.middleware.isLoggedIn,Services.middleware.isUser];
module.exports.routes = {
    'GET /getProfile': async (req,res) => {
        if(req.auth && req.auth.hasOwnProperty('id')){
            res.json(await Services.user.getProfile(req.auth.id));
        } else {
            res.json({ok:falase,message:"Missing params"})
        }
    },
    'POST /updateProfile': async (req,res) => {
        if(req.body && req.body.hasOwnProperty('update')){
            res.json(await Services.user.updateProfile(req.auth.id,req.body.update));
        } else {
            res.json({ok:falase,message:"Missing params"})
        }
    }
}
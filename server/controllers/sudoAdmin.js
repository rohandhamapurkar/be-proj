module.exports.policies = [Services.middleware.isLoggedIn,Services.middleware.isSudoAdmin];
module.exports.routes = {
    'GET /getProfile': async (req,res) => {
        if(req.auth && req.auth.hasOwnProperty('id')){
            res.json(await Services.sudoAdmin.getProfile(req.auth.id));
        } else {
            res.json({ok:false,message:"Missing params"})
        }
    },
    'POST /updateProfile': async (req,res) => {
        if(req.body && req.body.hasOwnProperty('update')){
            res.json(await Services.sudoAdmin.updateProfile(req.auth.id,req.body.update));
        } else {
            res.json({ok:false,message:"Missing params"})
        }
    },
    'GET /generateNewApiKey': async (req,res) => {
        if(req.auth && req.auth.hasOwnProperty('id')){
            res.json(await Services.sudoAdmin.generateNewApiKey(req.auth.id));
        } else {
            res.json({ok:false,message:"Missing params"})
        }
    }
}

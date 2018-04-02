module.exports.policies = [Services.middleware.isSessionId];
module.exports.routes = {
    'GET /verifySession': async (req,res) => {
        console.log("verifySession",req.headers)
        if(req.sessionid){
            res.json({ok:true});
        } else {
            res.json({ok:false});
        }
    }
}
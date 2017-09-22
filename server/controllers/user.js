module.exports.policies= [Services.middleware.isLoggedIn,Services.middleware.isUser];
module.exports.routes = {
    'GET /test': async (req,res)=>{
        res.json({ok:true});
    }
}
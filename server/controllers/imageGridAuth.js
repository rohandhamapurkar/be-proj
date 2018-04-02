module.exports.policies = [Services.middleware.isSessionId];
module.exports.routes = {
    'GET /grid': async(req,res) => {
        if(req.headers.hasOwnProperty('userid')){
            userSeq = await Services.imageGrid.getUserValidSeq(req.headers.userid);
            if(userSeq != null){
                let result = await Services.imageGrid.generateGridSequence(userSeq);
                await Services.imageGrid.saveValidity(req.headers.userid,req.headers.sessionid,result.validity);
                res.json({ok:true,data:result.urls});
            } else {
                res.json({ok:false,message:"Something went wrong"});
            }
        } else {
            res.json({ok:false,message:"Missing params"});
        }
    },
    'POST /authenticateGrid': async(req,res) => {
        if(req.body && req.body.hasOwnProperty('userResponse')){
            let result = await Services.imageGrid.getValidity(req.headers.sessionid);
            if(result != null){
                authentication = true;
                for(i in result.result[0]){
                    if(result.result[0][i] !== req.body.userResponse[i]){
                        authentication = false;
                    }
                }
                await Services.auth.saveAuthState(req.headers.sessionid,authentication);
                res.json({ok:true});
            } else {
                res.json({ok:false,message:"Something went wrong"});
            }
        } else {
            res.json({ok:false,message:"Missing params"});
        }
    }
}
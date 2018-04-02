module.exports.policies = [Services.middleware.isSessionId];
module.exports.routes = {
    'GET /grid': async(req,res) => {
        if(req.headers.hasOwnProperty('userid')){
            userSeq = await Services.imageGrid.getUserValidSeq(req.headers.userid);
            if(userSeq != null){
                let result = await Services.imageGrid.generateGridSequence(userSeq);
                let update = {
                    sessionId:req.headers.sessionid,
                    validity:result.validity
                };
                await Services.imageGrid.saveValidity(req.headers.userid,update);
                delete update;
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
                res.json({ok:true,authentication:authentication});
            } else {
                res.json({ok:false,message:"Something went wrong"});
            }
        } else {
            res.json({ok:false,message:"Missing params"});
        }
    }
}
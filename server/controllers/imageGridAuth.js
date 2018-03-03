module.exports.policies = [Services.middleware.isSessionId];
module.exports.routes = {
    'GET /grid': async(req,res) => {
        if(req.headers.hasOwnProperty('userId')){
            userSeq = await Services.imageGrid.getUserValidSeq(req.headers.userId);
            if(userSeq != null){
                let result = Services.imageGrid.generateGridSequence(userSeq);
                res.json({ok:true,data:result.urls});
                let update = {
                    sessionId:req.headers.sessionId,
                    validity:result.validity
                };
                Services.imageGrid.saveValidity(req.headers.userId,update);
                delete update;
            } else {
                res.json({ok:false,message:"Something went wrong"});
            }
        } else {
            res.json({ok:false,message:"Missing params"});
        }
    },
    'POST /authenticateGrid': async(req,res) => {
        if(req.body && req.body.hasOwnProperty('userResponse')){
            let result = await Services.imageGrid.getValidity();
            if(result != null){
                authentication = true;
                for(i in result){
                    if(result[i] !== userResponse[i]){
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
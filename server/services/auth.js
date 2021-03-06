let jwt = require('jsonwebtoken');
function generateUUID(){
	var d = new Date().getTime();
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c)
	{
		var r = (d + Math.random()*16)%16 | 0;
		d = Math.floor(d/16);
		return (c=='x' ? r : (r&0x3|0x8)).toString(16);
	});

    return uuid;
}
module.exports = {
    saveSession: async (id,update) => {
        try{
            let result = await db.auth.update({id:id},{$push:{sessions:update}});
        } catch (err) {
            console.log('Mongo issue ', err.code);
            return { ok: false, message: 'unknown db issue' };
        }
    },
    saveAuthState: async (sessionId,set) => {
        try{
            let result = await db.auth.update({"sessions":{$elemMatch:{sessionId:sessionId}}},{$set:{'sessions.$.authentication':set}});
        } catch (err) {
            console.log('Mongo issue ', err.code);
            return { ok: false, message: 'unknown db issue' };
        }
    },
    getAuthState: async (sessionId) => {
        let result = await db.auth.aggregate([{$unwind:"$sessions"},{$match:{$and:[{"sessions.sessionId":sessionId}]}},{$group:{_id:null,"result":{$push:"$sessions.authentication"}}}]).toArray();
        if (result[0] != undefined) {
            return result[0];
        }
        else {
            return null;
        } 
    },
    generateUUID: () => {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c)
        {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
    
        return uuid;
    },
    issueToken: claim => {
        return jwt.sign(claim, config.auth.secret, { expiresIn: config.auth.tokenLifeInSec });
    },
    verifyToken: async token => new Promise((resolve, reject) => {
        jwt.verify(token, config.auth.secret, (err, decoded) => {
            if (err) { resolve(false) }
            else { resolve(decoded) }
        })
    }),
    hashPassword: password => {
        const crypto = require('crypto');
        const secret = 'kjbs76576cdkjhsbdjbsd8732y8gfe387g2ofg27fg27o4lyg';
        const hash = crypto.createHmac('sha256', secret)
            .update(password)
            .digest('hex');
        return hash;
    },
    checkUserExists: async (user) => {
        try {
            let result = await db.auth.findOne(user, { id:1,accountType:1,_id:0 });
            if (result) {
                return ({ ok: true, user: result });
            }
            else {
                return ({ ok: false, message: "No such user exists" });
            }
        } catch (err) {
            console.log('Mongo issue ', err);
            return ({ ok: false, message: 'unknown db issue' });
        }
    },
    registerUser: async user => {
        try {
            let apiKey = null;
            let result = null;
            if(user.accountType == '1'){
                apiKey = generateUUID();
                user.apiKey = apiKey;
                result = await db.auth.insert(user);
            } else {
                result = await db.auth.insert(user);
            }
            if(result.result.ok==1 && result.result.n==1){
                return {ok:true, message:'user account created',apiKey:apiKey}
            }else{
                return {ok:false, message:'could not create account'}
            }
        } catch (err) {
            if (err.code && err.code == 11000) {
                return { ok: false, message: 'user already present' };
            } else {
                console.log('Mongo issue ', err.code);
                return { ok: false, message: 'unknown db issue' };
            }
        }
    },
    verifyApiKey: async key => {
        let result = await db.auth.findOne({'apiKey':key},{'id':1});
        if (result) {
            return ({ ok: true, resp: result });
        }
        else {
            return ({ ok: false, message: "No such apiKey exists" });
        }
    }
}
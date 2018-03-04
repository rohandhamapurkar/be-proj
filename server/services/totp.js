module.exports = {
    saveSecret: async function (userId, secret) {
        let result = await db.auth.update({id:userId}, {$set:{secret:secret}});
    }, 
    
    getSecret: async function(userId) {
        let result = await db.auth.findOne({id:userId}, {_id:0, secret:1});
        return result;
    }
}
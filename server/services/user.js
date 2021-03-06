module.exports = {
    getProfile: async (id) => {
        try {
            let result = await db.auth.findOne({id:id ,accountType:10}, { _id:0,password:0,sessions:0,secret:0,image:0,accountType:0,validSeq:0});
            if (result) {
                return ({ ok: true, profile: result });
            }
            else {
                return ({ ok: false, message: "User doesnt exist" });
            }
        } catch (err) {
            console.log('Mongo issue ', err);
            return ({ ok: false, message: 'unknown db issue' });
        }
    },
    getImageGridSettings: async (id) => {
        try {
            let result = await db.auth.findOne({id:id ,accountType:10}, { _id:0,validSeq:1});
            if (result) {
                return ({ ok: true, validSeq:result.validSeq });
            }
            else {
                return ({ ok: false, message: "User doesnt exist" });
            }
        } catch (err) {
            console.log('Mongo issue ', err);
            return ({ ok: false, message: 'unknown db issue' });
        }
    },
    updateProfile: async (id,update) => {
        try{
            let set = {$set:{}}
            for(i in update){
                if(i == 'password'){
                    set['$set'][i] = await Services.auth.hashPassword(update[i]);
                } else {
                    set['$set'][i] = update[i];
                }

            }
            let result = await db.auth.update({id:id,accountType:10},set);
            if (result.result.ok == 1 && result.result.n == 1) {
                return { ok: true, message: 'Updated Profile' }
            } else {
                return { ok: false, message: 'could not update profile' }
            }
        } catch(err){
            console.log('Mongo issue ', err);
            return ({ ok: false, message: 'unknown db issue' });
        }
    }
}

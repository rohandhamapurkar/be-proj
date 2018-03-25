module.exports = {
    getProfile: async (id) => {
        try {
            let result = await db.auth.findOne({id:id ,accountType:1}, { _id:0,password:0,accountType:0});
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
            let result = await db.auth.update({id:id ,accountType:1},set);
            if (result.result.ok == 1 && result.result.n == 1) {
                return { ok: true, message: 'Updated Profile' }
            } else {
                return { ok: false, message: 'could not update profile' }
            }
        } catch(err){
            console.log('Mongo issue ', err);
            return ({ ok: false, message: 'unknown db issue' });
        }
    },
    generateNewApiKey: async (id) => {
        let apiKey = await Services.auth.generateUUID();
        let result = await Services.sudoAdmin.updateProfile(id,{apiKey:apiKey});
        if(result.ok){
            res.json({ok:true,apiKey:apiKey});
        } else {
            res.json({ok:false,message:"APi generation failed"})
        }
    }
}

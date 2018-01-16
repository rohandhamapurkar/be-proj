module.exports = {
    registerUser: async user => {
        try {
            let result = await db.auth.insert({id:user.id,password:user.password,accountType:10});
            if(result.result.ok==1 && result.result.n==1){
                return {ok:true, message:'user account created'}
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
    }
}
let fs = require('fs');
module.exports = {
    getValidity: async sessionId => {
        let result = await db.auth.aggregate([{$unwind:"$sessions"},{$match:{$and:[{"sessions.sessionId":sessionId}]}},{$group:{_id:null,"result":{$push:"$sessions.validity"}}}]);
        if (result[0] != undefined) {
            return result[0];
        }
        else {
            return null;
        } 
    },
    saveValidity: async (id,update) => {
        try{
            let result = await db.auth.update({id:id},{$push:{sessions:update}});
        } catch (err) {
            console.log('Mongo issue ', err.code);
            return { ok: false, message: 'unknown db issue' };
        }
        
    },
    getUserValidSeq: async id => {
        let result = await db.auth.findOne({'id':id},{'validSeq':1});
        if (result) {
            return result.validSeq;
        }
        else {
            return null;
        } 
    },
    generateGridSequence: async(validSeq) =>{
        let data = JSON.parse(fs.readFileSync(process.cwd() + '/server/services/urls.json'));
        let valid1 = false;
        let valid2 = false;
        let valid3 = false;
        let arr = []
        function generate() {
            valid1 = false;
            valid2 = false;
            valid3 = false;
            for(let i=0;i<27;i++){
                let num = Math.floor(Math.random() * 269) + 0
                arr.push(data[num]);
                if(data[num].match(validSeq[0]) || data[num].match(validSeq[1]) || data[num].match(validSeq[2]) || data[num].match(validSeq[3])){
                    if(i<9){
                        valid1 = true;
                    } else if(i<18){
                        valid2 = true;
                    } else {
                        valid3 = true;
                    }
                } 
            }
            if(valid1 && valid2 && valid3){
                generate();
            } else if(!valid1 && !valid2 && !valid3){
                generate();
            }    
        }
        generate();
        return {urls:arr,validity:[valid1,valid2,valid3]}
    }
}
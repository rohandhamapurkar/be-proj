const f5stego = require('f5stegojs');
const atob = require('atob');
const btoa = require('btoa')
const stegger = new f5stego(config.stegKey);
module.exports = {
    generateImageBase64: async (data,user) => {
        let base64Data = data.replace('data:image/jpeg;base64,',"")
        base64Data += base64Data.replace('+', ' ');
        let arr=[];
        let token = {token:await Services.auth.issueToken({ id: user.id , accountType: user.accountType })}
        str = JSON.stringify(token);
        for(let i=0,j=str.length;i<j;++i){
            arr.push(str.charCodeAt(i));
        }
        let imageArray = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0)) 
        let secretImage = stegger.embed(imageArray, arr);
        let imageData = btoa(String.fromCharCode.apply(null, secretImage));
        let result = await db.auth.update({id:user.id},{$set:{image:imageData}});
        if (result.result.ok == 1 && result.result.n == 1) {
            return { ok: true, message: 'Generated image' }
        } else {
            return { ok: false, message: 'could not Generated image' }
        }
    },
    getImageBase64: async(user) => {
        try {
            let result = await db.auth.findOne({id:user.id}, { image:1,_id:0 });
            if (result) {
                return ({ ok: true, image: result });
            }
            else {
                return ({ ok: false, message: "User doesnt exist" });
            }
        } catch (err) {
            console.log('Mongo issue ', err);
            return ({ ok: false, message: 'unknown db issue' });
        }
    },
    authenticateImage: async(data,userId) =>{
        let base64Data = data.replace('data:image/jpeg;base64,',"")
        base64Data += base64Data.replace('+', ' ');
        let imageArray = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0)) 
        var message = stegger.extract(secretImage);
        try{
            let encodedData = JSON.parse(String.fromCharCode.apply(null, message))
            if(encodedData && encodedData.hasOwnProperty('token')){
                let result = Services.auth.verifyToken(encodedData.token);
                if(result.id == userId){
                    return({ok:true,authentication:true})
                } else {
                    return({ok:false,message:"Token data doesnt match",authentication:false})
                }
            }
        }
        catch(e){
            return({ok:false,message:"Invalid image cannot parse",authentication:false})
        }
    }
}
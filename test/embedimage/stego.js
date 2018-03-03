let cryptico = require('cryptico')
const fs = require('fs')
const steggy = require('steggy')


var randomsecret = "asFASDKBK231kjbedaskdb23kjbdsZAJKdb2";
var key = cryptico.generateRSAKey(randomsecret, 1024);
var PublicKey = cryptico.publicKeyString(key);

let encrypt = cryptico.encrypt(JSON.stringify({"id":"786","name":"Rohan","flag":true}),PublicKey); 
const concealed = steggy.conceal()(fs.readFileSync('./TheGodFather.png'), encrypt.cipher)
fs.writeFileSync('./output.png', concealed)



const image = fs.readFileSync('./output.png')
const revealed = steggy.reveal()(image)
let decrypt = cryptico.decrypt(revealed.toString(), key);
console.log(decrypt.plaintext)
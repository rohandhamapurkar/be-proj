var f5stego = require('f5stegojs');
var atob = require('atob');
var stegger = new f5stego(stegKey); // init stegger with key 
var base64Data = data.replace('data:image/jpeg;base64,',"")
base64Data += base64Data.replace('+', ' ');
var arr=[];
str = JSON.stringify({me:[12,12,12,12,3,343,4,45,65,57,435,23,44,645,764,5,435,345,34,5345,5,756,756,7,5,345,345,345,456,56,768,56,45,63,5634,534,5456,567,78,678,678,67,]})
for(var i=0,j=str.length;i<j;++i){
  arr.push(str.charCodeAt(i));
}
uint=new Uint8Array(arr);
var imageArray = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0)) 
//embed message into image 
var secretImage = stegger.embed(imageArray, arr);
 
//extract message from image 
var message = stegger.extract(secretImage);
console.log(JSON.parse(String.fromCharCode.apply(null, message)))
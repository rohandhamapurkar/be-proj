let tint = require('./tint');
let fs = require('fs');
let data = JSON.parse(fs.readFileSync('./paths.json'));
valid1 = false;
valid2 = false;
valid3 = false;
let arr = []
for(let i=0;i<27;i++){
    let num = Math.floor(Math.random() * 80)
    arr.push(data[num]);
    if(data[num].match('catgray') || data[num].match('doggray') || data[num].match('catred') || data[num].match('dogred')){
        if(i<9){
            valid1 = true;
        } else if(i<18){
            valid2 = true;
        } else {
            valid3 = true;
        }
    } 
}
console.log(valid1,valid2,valid3)
console.log(arr)
async function convert(){
    let list = fs.readdirSync('./category');
    let retList = [];
    let imagePath = [];
    list.forEach(doc=>{
        retList.push(doc.split('.')[0])
    });
    let l =0;
    for(i of retList){
        console.log(l);
        let image = await(tint.read('./category/'+i+'.jpg'));
        image.color('red',50).write("./generate/"+i+"red"+l+".jpg")
        imagePath.push(i+"red"+l+".jpg");
        l++;
    }
    for(i of retList){
        console.log(l);
        let image = await(tint.read('./category/'+i+'.jpg'));
        image.color('brown',50).write("./generate/"+i+"brown"+l+".jpg")
        imagePath.push(i+"brown"+l+".jpg");
        l++;
    }
    for(i of retList){
        console.log(l);
        let image = await(tint.read('./category/'+i+'.jpg'));
        image.color('pink',50).write("./generate/"+i+"pink"+l+".jpg")
        imagePath.push(i+"pink"+l+".jpg");
        l++;
    }
    for(i of retList){
        console.log(l);
        let image = await(tint.read('./category/'+i+'.jpg'));
        image.color('purple',50).write("./generate/"+i+"purple"+l+".jpg")
        imagePath.push(i+"purple"+l+".jpg");
        l++;
    }
    for(i of retList){
        console.log(l);
        let image = await(tint.read('./category/'+i+'.jpg'));
        image.color('orange',50).write("./generate/"+i+"orange"+l+".jpg")
        imagePath.push(i+"orange"+l+".jpg");
        l++;
    }
    for(i of retList){
        console.log(l);
        let image = await(tint.read('./category/'+i+'.jpg'));
        image.color('gray',50).write("./generate/"+i+"gray"+l+".jpg")
        imagePath.push(i+"gray"+l+".jpg");
        l++;
    }
    for(i of retList){
        console.log(l);
        let image = await(tint.read('./category/'+i+'.jpg'));
        image.color('green',50).write("./generate/"+i+"green"+l+".jpg")
        imagePath.push(i+"green"+l+".jpg");
        l++;
    }
    for(i of retList){
        console.log(l);
        let image = await(tint.read('./category/'+i+'.jpg'));
        image.color('blue',50).write("./generate/"+i+"blue"+l+".jpg")
        imagePath.push(i+"blue"+l+".jpg");
        l++;
    }
    for(i of retList){
        console.log(l);
        let image = await(tint.read('./category/'+i+'.jpg'));
        image.color('yellow',50).write("./generate/"+i+"yellow"+l+".jpg")
        imagePath.push(i+"yellow"+l+".jpg");
        l++;
    }
    fs.writeFileSync('./paths.json',JSON.stringify(imagePath))
}

convert();
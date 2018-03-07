let tint = require('jimp');
let fs = require('fs');
// random url generating algo
// let data = JSON.parse(fs.readFileSync('./paths.json'));
// valid1 = false;
// valid2 = false;
// valid3 = false;
// let arr = []
// for(let i=0;i<27;i++){
//     let num = Math.floor(Math.random() * 80)
//     arr.push(data[num]);
//     if(data[num].match('catgray') || data[num].match('doggray') || data[num].match('catred') || data[num].match('dogred')){
//         if(i<9){
//             valid1 = true;
//         } else if(i<18){
//             valid2 = true;
//         } else {
//             valid3 = true;
//         }
//     } 
// }
// console.log(valid1,valid2,valid3)
// console.log(arr)
async function convert(){
    let list1 = fs.readdirSync('../../static/gridImages/1');
    let list2 = fs.readdirSync('../../static/gridImages/2');
    let list3 = fs.readdirSync('../../static/gridImages/3');
    let retList1 = [];
    let retList2 = [];
    let retList3 = [];
    let imagePath = []
    list1.forEach(doc=>{
        retList1.push(doc.split('.')[0])
    });
    list2.forEach(doc=>{
        retList2.push(doc.split('.')[0])
    });
    list3.forEach(doc=>{
        retList3.push(doc.split('.')[0])
    });
    let mylist = {
        'retList1':{data:retList1, path:"../../static/gridImages/1/"},
        'retList2':{data:retList2, path:"../../static/gridImages/2/"},
        'retList3':{data:retList3, path:"../../static/gridImages/3/"}
    }
    let l =0;
    for(j in mylist){
        for(i of mylist[j].data){
            console.log(l,i);
            let image = await tint.read(mylist[j].path+i+'.jpeg')
                image.greyscale().color([{apply:'mix',params:['purple',53]}])           
                     .write("./generate/"+i+"purple"+l+".jpeg"); 
            imagePath.push("https://github.com/rohandhamapurkar/be-proj/raw/master/static/gridImages/"+i+"purple"+l+".jpeg");
            l++;
        }
        for(i of mylist[j].data){
            console.log(l,i);
            let image = await tint.read(mylist[j].path+i+'.jpeg')
                image.greyscale().color([{apply:'mix',params:['red',33]}])           
                     .write("./generate/"+i+"red"+l+".jpeg"); 
            imagePath.push("https://github.com/rohandhamapurkar/be-proj/raw/master/static/gridImages/"+i+"red"+l+".jpeg");
            l++;
        }
        for(i of mylist[j].data){
            console.log(l,i);
            let image = await tint.read(mylist[j].path+i+'.jpeg')
                image.greyscale().color([{apply:'mix',params:['blue',43]}])           
                     .write("./generate/"+i+"blue"+l+".jpeg"); 
            imagePath.push("https://github.com/rohandhamapurkar/be-proj/raw/master/static/gridImages/"+i+"blue"+l+".jpeg");
            l++;
        }
        for(i of mylist[j].data){
            console.log(l,i);
            let image = await tint.read(mylist[j].path+i+'.jpeg')
                image.greyscale().color([{apply:'mix',params:['green',53]}])           
                     .write("./generate/"+i+"green"+l+".jpeg"); 
            imagePath.push("https://github.com/rohandhamapurkar/be-proj/raw/master/static/gridImages/"+i+"green"+l+".jpeg");
            l++;
        }
        for(i of mylist[j].data){
            console.log(l,i);
            let image = await tint.read(mylist[j].path+i+'.jpeg')
                image.greyscale().color([{apply:'mix',params:['brown',60]}])           
                     .write("./generate/"+i+"brown"+l+".jpeg"); 
            imagePath.push("https://github.com/rohandhamapurkar/be-proj/raw/master/static/gridImages/"+i+"brown"+l+".jpeg");
            l++;
        }
        for(i of mylist[j].data){
            console.log(l,i);
            let image = await tint.read(mylist[j].path+i+'.jpeg')
                image.greyscale()
                    .color([{apply:'mix',params:['#cc0099',50]}])           
                     .write("./generate/"+i+"pink"+l+".jpeg"); 
            imagePath.push("https://github.com/rohandhamapurkar/be-proj/raw/master/static/gridImages/"+i+"pink"+l+".jpeg");
            l++;
        }
        for(i of mylist[j].data){
            console.log(l,i);
            let image = await tint.read(mylist[j].path+i+'.jpeg')
                image.greyscale().color([{apply:'mix',params:['cyan',43]}])           
                     .write("./generate/"+i+"cyan"+l+".jpeg"); 
            imagePath.push("https://github.com/rohandhamapurkar/be-proj/raw/master/static/gridImages/"+i+"cyan"+l+".jpeg");
            l++;
        }
        for(i of mylist[j].data){
            console.log(l,i);
            let image = await tint.read(mylist[j].path+i+'.jpeg')
                image.greyscale().color([{apply:'mix',params:['orange',43]}])           
                     .write("./generate/"+i+"orange"+l+".jpeg"); 
            imagePath.push("https://github.com/rohandhamapurkar/be-proj/raw/master/static/gridImages/"+i+"orange"+l+".jpeg");
            l++;
        }
        for(i of mylist[j].data){
            console.log(l,i);
            let image = await tint.read(mylist[j].path+i+'.jpeg')
                image.greyscale().color([{apply:'mix',params:['yellow',43]}])           
                     .write("./generate/"+i+"yellow"+l+".jpeg"); 
            imagePath.push("https://github.com/rohandhamapurkar/be-proj/raw/master/static/gridImages/"+i+"yellow"+l+".jpeg");
            l++;
        }
    }
    
    
    console.log(imagePath);
    fs.writeFileSync('./urls.json',JSON.stringify(imagePath))
}

convert();
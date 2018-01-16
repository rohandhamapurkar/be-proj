let tint = require('./tint');

async function convert(){
    let image = await(tint.read('./TheGodFather.jpg'));
    image.color('red',50).write("./output.jpg")
}

convert();
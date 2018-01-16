let tint = require('./tint');

tint.read('./TheGodFather.jpg',function(err,image){
    image.color('red',50).write("./output.jpg")
})
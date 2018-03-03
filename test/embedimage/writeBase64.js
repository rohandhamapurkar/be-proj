var fs = require('fs');
let base64Data = data.replace(/^data:image\/png;base64,/, "");
base64Data += base64Data.replace('+', ' ');

fs.writeFile('my.png', base64Data, 'base64', (err) => {
    console.log(err);
});


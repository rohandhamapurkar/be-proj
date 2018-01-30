let express = require('express');
let app = express();

app.use(require('body-parser').json());
//app.use(require('cors')());

app.use('/',express.static(process.cwd()+'/dist'));

app.listen(5000);
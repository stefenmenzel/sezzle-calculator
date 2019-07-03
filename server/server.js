const express = require('express');

const app = express();
const bodyParser = require('body-parser');


//body parser
app.use(bodyParser.json);
app.use(bodyParser.urlencoded({extended: true}));

//serve static files
app.use(express.static('build'));

//app set
const PORT = process.env.PORT || 5000;

//listen
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
})
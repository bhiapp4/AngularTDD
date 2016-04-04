var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());

var contacts = [{
    name : "Appi"    
},{

    name:"Robert"
}];

app.get('/contacts',function(req, resp){
    resp.status(200).json(contacts);
});

app.listen(9001);
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.post('/SolicitaToken', function (req, res) {
    console.log(req)
    var cadena = "<?xml version='1.0' encoding='UTF-8'?>" +
    "<SolicitaTokenRequest>" +
        "<usuario>" + req.body.usuario + "</usuario>" +
        "<apikey>" + req.body.password + "</apikey>" +
    "</SolicitaTokenRequest>";

    request.post({
        "headers": { "content-type": "application/xml" },
        "url": "https://dev.api.ifacere-fel.com/fel-dte-services/api/solicitarToken",
        "body": cadena
    }, (error, response, body) => {
        if(error) {
            res.send(error)
        }
        res.send(body);
    });
});

app.listen(3000, function () {
  console.log('aplicacion en el puerto 3000');
});
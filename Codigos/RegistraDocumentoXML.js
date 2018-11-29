

var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.post('/RegistraDocumento', function (req, res) {
    console.log('Datos recibidos')
    var cadena = "<?xml version='1.0' encoding='UTF-8'?>" +
                    "<RegistraDocumentoXMLRequest id="+ req.params.id + ">" +
                        "<xml_dte>" + "<![CDATA[" + req.params.documento + "]]>" + "</xml_dte>" +
                    "</RegistraDocumentoXMLRequest>";

    console.log(cadena)
    request.post({
        "headers": { "content-type": "application/xml",
                     "authorization": "Bearer " + req.params.token },
        "url": "https://dev.api.ifacere-fel.com/fel-dte-services/api/registrarDocumentoXML",
        "body": cadena
    }, (error, response, body) => {
        if(error) {
            res.send(error)
        }
        res.send(body);
    });
});

app.listen(3000, function () {
  console.log('aplicaci�n en el puerto 3000');
});



var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors({ origin: '*' }));
app.use(express.static('public'));
app.get("*", function (request, response) {
    response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
    console.log('Listening on port ' + listener.address().port);
});

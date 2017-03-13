const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + "/static")));
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');
app.get('/', function (req, res) {
    res.render("index");
});
const server = app.listen(8000, function () {
    console.log('listening on port 8000');
});
const io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
    socket.on("form_submit", function (data){
        let random_number = Math.floor((Math.random() * 1000) + 1);
        socket.emit('return_form', {response: data.form_data});
        socket.emit('random_number', {response: random_number});
    });

    console.log(socket.id);
});


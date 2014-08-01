var xhr = require('xhr');
var root = document.querySelector('#root');

xhr({ uri: '/game.svg' }, function (err, res, body) {
    root.innerHTML = body;
});

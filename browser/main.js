var xhr = require('xhr');
var Player = require('./player.js');
var Rain = require('./rain.js');
var Engine = require('./engine.js');

var root = document.querySelector('#root');

var url = require('url');
var imfile = url.resolve(location.href, 'game.svg');

xhr({ uri: imfile }, function (err, res, body) {
    root.innerHTML = body;
    var player = Player(root.querySelector('svg #player'));
    var bank = require('./bank.js')(root);
    window.bank = bank;
    
    var emoney = root.querySelector('svg #money');
    emoney.parentNode.removeChild(emoney);
    
    var rain = Rain(emoney);
    rain.on('cash', function (n) {
        //console.log(n);
    });
    rain.appendTo(root.querySelector('svg'));
    
    setInterval(function () {
        rain.drop(Math.floor(Math.random() * 1e7 + 1e4));
    }, 2000);
    
    window.addEventListener('keydown', function (ev) {
        var name = ev.keyIdentifier;
        if (name === 'Right') {
            player.right();
        }
        else if (name === 'Left') {
            player.left();
        }
        else if (ev.which === 32) {
            player.jump();
        }
        else if (name === 'F1') {
            engine.toggle();
        }
        else return;
        
        ev.preventDefault();
    });
    
    var engine = Engine(player, rain);
    engine.run();
});

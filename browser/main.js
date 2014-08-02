var Player = require('./player.js');
var Rain = require('./rain.js');
var Engine = require('./engine.js');

var fs = require('fs');
var svgsrc = fs.readFileSync(__dirname + '/../static/images/game.svg', 'utf8');

var root = document.querySelector('#root');
root.innerHTML = svgsrc;

var sprites = {
    homeless: root.querySelector('svg #homeless'),
    protester: root.querySelector('svg #protester'),
    tent: root.querySelector('svg #tent'),
    barrel: root.querySelector('svg #barrel')
};
Object.keys(sprites).forEach(function (key) {
    sprites[key].parentNode.removeChild(sprites[key]);
});

var player = Player(root.querySelector('svg #player'));
var bank = require('./bank.js')(root);
var eparent = player.element.parentNode;

var emoney = root.querySelector('svg #money');
emoney.parentNode.removeChild(emoney);

var rain = Rain(emoney);
bank.set(1000000);
rain.on('cash', function (n) {
    bank.deposit(n);
});
rain.appendTo(root.querySelector('svg'));

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

var engine = Engine(function (dt) {
    player.tick(dt);
    rain.tick(dt);
    rain.check(player);
});
engine.setInterval(function () {
    rain.drop(Math.floor(Math.random() * 1e7 + 1e4));
}, 500);
engine.run();

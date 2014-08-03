var Player = require('./player.js');
var Rain = require('./rain.js');
var Loop = require('frame-loop');
var Sprite = require('box-sprite-svg');
var collide = require('box-collide');
var keynames = require('keynames');

var fs = require('fs');
var svgsrc = fs.readFileSync(__dirname + '/../static/images/game.svg', 'utf8');

var root = document.querySelector('#root');
root.innerHTML = svgsrc;

var elements = {
    homeless: root.querySelector('svg #homeless'),
    protester: root.querySelector('svg #protester'),
    tent: root.querySelector('svg #tent'),
    barrel: root.querySelector('svg #barrel')
};
Object.keys(elements).forEach(function (key) {
    elements[key].parentNode.removeChild(elements[key]);
});

var pnode = root.querySelector('svg #player').parentNode;
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
    var name = keynames[ev.which];
    if (name === 'right') {
        player.right();
    }
    else if (name === 'left') {
        player.left();
    }
    else if (ev.which === 32) {
        player.jump();
    }
    else if (name === 'f1' || ev.keyIdentifier === 'F1') {
        engine.toggle();
    }
    else return;
    
    ev.preventDefault();
});

var engine = Loop(function (dt) {
    player.tick(dt);
    rain.tick(dt);
    h.tick(dt);
    rain.check(player);
    if (collide(h.bbox(), player.bbox())) {
        bank.deposit(-Math.floor(Math.random() * 500));
    }
});

engine.setInterval(function () {
    if (Math.random() > 0.5) {
        rain.drop(Math.floor(Math.random() * 1e7 + 1e4));
    }
}, 500);

var h = Sprite(elements.homeless.cloneNode(true));
h.on('tick', function (dt) {
    h.position.x = Math.max(-500, Math.min(800, h.position.x));
});
h.appendTo(pnode);
h.position.x = 600;
h.tick(0);

engine.setInterval(function () {
    var x = Math.floor(Math.random() * 3) - 1;
    h.velocity.x = x * 100;
}, 500);

engine.run();

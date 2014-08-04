var Loop = require('frame-loop');
var Game = require('./game.js');
var Money = require('./money.js');

var game = Game().appendTo('#root');
game.bank.set(1000000);

game.on('collide', function (sp) {
    if (sp.name === 'money') {
        game.bank.deposit(sp.amount);
        game.remove(sp);
    }
    else if (sp.name === 'homeless') {
        game.bank.deposit(-Math.floor(Math.random() * 500));
    }
    else if (sp.name === 'protester') {
        game.bank.deposit(-Math.floor(Math.random() * 2000));
    }
    else if (sp.name === 'barrel') {
        game.bank.deposit(-Math.floor(Math.random() * 1000));
    }
    else if (sp.name === 'tent') {
        game.bank.deposit(-Math.floor(Math.random() * 5000));
    }
});

var engine = Loop(function (dt) { game.tick(dt) });
engine.setInterval(function () {
    if (Math.random() > 0.5) {
        var amount = Math.floor(Math.random() * 1e7 + 1e4);
        var cash = Money(game.add('money'), amount);
        cash.on('miss', function () {
            game.remove(cash);
        });
    }
}, 500);

engine.run();

window.addEventListener('keydown', function (ev) {
    if (ev.which === 39) game.player.right();
    else if (ev.which === 37) game.player.left();
    else if (ev.which === 32) game.player.jump();
    else if (ev.which === 112) engine.toggle(); // f1 -> pause
    else return;
    ev.preventDefault();
});

window.addEventListener('keyup', function (ev) {
    var v = game.player.velocity;
    if (ev.which === 39 && v.x > 0) game.player.stand();
    else if (ev.which === 37 && v.x < 0) game.player.stand();
});

function add (name) {
    var h = game.add(name);
    h.on('tick', function (dt) {
        h.position.x = Math.max(-500, Math.min(800, h.position.x));
    });
    h.position.x = -1000 * Math.random() + 500;
    
    if (name === 'homeless') {
        engine.setInterval(function () {
            var x = Math.floor(Math.random() * 3) - 1;
            h.velocity.x = x * 100;
        }, 500);
    }
    else if (name === 'protester') {
        engine.setInterval(function () {
            var x = Math.floor(Math.random() * 3) - 1;
            h.velocity.x = x * 200;
        }, 200);
    }
}

for (var i = 0; i < 10; i++) add('homeless');
for (var i = 0; i < 10; i++) add('protester');
for (var i = 0; i < 2; i++) add('tent');
for (var i = 0; i < 2; i++) add('barrel');

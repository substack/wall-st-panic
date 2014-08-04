var Loop = require('frame-loop');
var Game = require('./game.js');

var game = Game().appendTo('#root');
game.bank.set(1000000);

game.on('collide', function (sp) {
    game.bank.deposit(-Math.floor(Math.random() * 500));
});

var engine = Loop(function (dt) { game.tick(dt) });
engine.on('fps', function (fps) {
    console.log('fps=', fps);
});

engine.setInterval(function () {
    if (Math.random() > 0.5) {
        game.rain.drop(Math.floor(Math.random() * 1e7 + 1e4));
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

/*
var h = game.create('homeless');
h.on('tick', function (dt) {
    h.position.x = Math.max(-500, Math.min(800, h.position.x));
});
h.position.x = 600;

engine.setInterval(function () {
    var x = Math.floor(Math.random() * 3) - 1;
    h.velocity.x = x * 100;
}, 500);
*/

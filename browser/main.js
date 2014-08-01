var xhr = require('xhr');
var root = document.querySelector('#root');
var createPlayer = require('./player.js');

xhr({ uri: '/game.svg' }, function (err, res, body) {
    root.innerHTML = body;
    var player = createPlayer(root.querySelector('svg #player'));
    
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
    });
    
    var last = Date.now();
    (function tick () {
        var now = Date.now();
        var dt = now - last;
        last = now;
        
        player.tick(dt);
        
        setTimeout(function () {
            window.requestAnimationFrame(tick);
        }, 20);
    })();
});

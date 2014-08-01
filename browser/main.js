var xhr = require('xhr');
var createPlayer = require('./player.js');
var createRain = require('./rain.js');

var root = document.querySelector('#root');

xhr({ uri: '/game.svg' }, function (err, res, body) {
    root.innerHTML = body;
    var player = createPlayer(root.querySelector('svg #player'));
    
    var emoney = root.querySelector('svg #money');
    emoney.parentNode.removeChild(emoney);
    
    var moneystorm = createRain(emoney);
    moneystorm.appendTo(root.querySelector('svg'));
    
    setInterval(function () { moneystorm.rain() }, 2000);
    
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
        moneystorm.tick(dt);
        moneystorm.check(player);
        
        setTimeout(function () {
            window.requestAnimationFrame(tick);
        }, 20);
    })();
});

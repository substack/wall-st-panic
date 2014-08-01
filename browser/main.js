var xhr = require('xhr');
var createPlayer = require('./player.js');
var createMoney = require('./money.js');

var root = document.querySelector('#root');

xhr({ uri: '/game.svg' }, function (err, res, body) {
    root.innerHTML = body;
    var player = createPlayer(root.querySelector('svg #player'));
    
    var emoney = root.querySelector('svg #money');
    emoney.parentNode.removeChild(emoney);
    
    var money = createMoney(emoney);
    money.appendTo(root.querySelector('svg'));
    
    setInterval(function () { money.rain() }, 1000);
    
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
        money.tick(dt);
        
        setTimeout(function () {
            window.requestAnimationFrame(tick);
        }, 20);
    })();
});

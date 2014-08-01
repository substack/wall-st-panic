var xhr = require('xhr');
var root = document.querySelector('#root');

xhr({ uri: '/game.svg' }, function (err, res, body) {
    root.innerHTML = body;
    var player = createElement('g');
    var gplayer = root.querySelector('svg #player');
    var gparent = gplayer.parentNode;
    
    gparent.removeChild(gplayer);
    player.appendChild(gplayer);
    gparent.appendChild(player);
    
    var accel = { x: 0, y: 0 };
    var velo = { x: 0, y: 0 };
    var pos = { x: 0, y: 0 };
    
    window.addEventListener('keydown', function (ev) {
        var name = ev.keyIdentifier;
        if (name === 'Right') {
            velo.x = 1;
        }
        else if (name === 'Left') {
            velo.x = -1;
        }
        else if (ev.which === 32 && velo.y === 0) {
            velo.y = 1;
            accel.y = -1;
        }
    });
    
    var last = Date.now();
    (function tick () {
        var now = Date.now();
        var dt = now - last;
        last = now;
        
        velo.y += accel.y * dt / 200;
        
        pos.x += velo.x * dt / 3;
        pos.x = Math.min(200, Math.max(-375, pos.x));
        pos.y -= velo.y * dt * 1.2;
        
        if (pos.y > 0) {
            velo.y = 0;
            accel.y = 0;
            pos.y = 0;
        }
        
        var tr = pos.x + ',' + pos.y;
        player.setAttribute('transform', 'translate(' + tr + ')');
        
        setTimeout(function () {
            window.requestAnimationFrame(tick);
        }, 20);
    })();
});

function createElement (name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
}

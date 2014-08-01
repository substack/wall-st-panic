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
    
    var delta = { x: 0, y: 0 };
    var pos = { x: 0, y: 0 };
    
    window.addEventListener('keydown', function (ev) {
        var name = ev.keyIdentifier;
        if (name === 'Right') {
            delta.x = -1;
        }
        else if (name === 'Left') {
            delta.x = 1;
        }
    });
    
    var last = Date.now();
    (function tick () {
        var now = Date.now();
        var dt = last - now;
        last = now;
        
        pos.x += delta.x * dt / 5;
        pos.x = Math.min(200, Math.max(-375, pos.x));
        
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

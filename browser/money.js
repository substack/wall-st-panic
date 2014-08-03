var Sprite = require('box-sprite-svg');

module.exports = function (elem, cash) {
    var sp = Sprite(elem);
    sp.position = { x: Math.random() * 595 - 485, y: -350 };
    sp.velocity.y = 200;
    
    sp.on('tick', function () {
        if (sp.position.y > 100) sp.emit('miss');
    });
    
    sp.cash = cash;
    sp.tick(0);
    
    return sp;
};

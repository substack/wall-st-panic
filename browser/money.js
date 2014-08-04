module.exports = function (sp, amount) {
    sp.name = 'money';
    sp.amount = amount;
    sp.position = { x: Math.random() * 607 - 437, y: -350 };
    sp.velocity.y = 200;
    
    sp.on('tick', function () {
        if (sp.position.y > 100) sp.emit('miss');
    });
    
    return sp;
};

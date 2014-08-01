var createElement = require('./element.js');
var createMoney = require('./money.js');

module.exports = Rain;

function Rain (elem) {
    if (!(this instanceof Rain)) return new Rain(elem);
    
    this.element = createElement('g');
    this.emoney = elem;
    this.money = [];
}

Rain.prototype.appendTo = function (target) {
    target.appendChild(this.element);
};

Rain.prototype.drop = function () {
    var self = this;
    var m = createMoney(this.emoney.cloneNode(true));
    m.appendTo(this.element);
    this.money.push(m);
    m.once('miss', function () { self.remove(m) });
};

Rain.prototype.remove = function (m) {
    var ix = this.money.indexOf(m);
    this.money.splice(ix, 1);
    this.element.removeChild(m.element);
};

Rain.prototype.tick = function (dt) {
    for (var i = 0; i < this.money.length; i++) {
        this.money[i].tick(dt);
    }
};

Rain.prototype.check = function (player) {
    for (var i = 0; i < this.money.length; i++) {
        var m = this.money[i];
        if (dist(pos(m), pos(player)) < 50) {
            this.remove(m);
        }
    }
};

function pos (m) {
    return {
        x: m.apos.x + m.pos.x,
        y: m.apos.y + m.pos.y
    };
}

function dist (a, b) {
    var dx = a.x - b.x, dy = a.y - b.y;
    return Math.sqrt(dx*dx + dy*dy);
}

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

Rain.prototype.rain = function () {
    var m = createMoney(this.emoney.cloneNode(true));
    m.appendTo(this.element);
    this.money.push(m);
};

Rain.prototype.tick = function (dt) {
    for (var i = 0; i < this.money.length; i++) {
        this.money[i].tick(dt);
    }
}

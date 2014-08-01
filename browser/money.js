var inherits = require('inherits');
var EventEmitter = require('events').EventEmitter;
var createElement = require('./element.js');

module.exports = Money;
inherits(Money, EventEmitter);

function Money (elem, cash) {
    if (!(this instanceof Money)) return new Money(elem, cash);
    EventEmitter.call(this);
    
    this.element = createElement('g');
    this.element.appendChild(elem);
    
    this.pos = { x: Math.random() * 595 - 485, y: -350 };
    this.v = { x: 0, y: 1 };
    this.cash = cash;
    this.tick(0);
}

Money.prototype.appendTo = function (target) {
    target.appendChild(this.element);
};

Money.prototype.tick = function (dt) {
    this.pos.y += dt * this.v.y / 5;
    var tr = this.pos.x + ',' + this.pos.y;
    this.element.setAttribute('transform', 'translate(' + tr + ')');
    if (this.pos.y > 100) this.emit('miss');
};

Money.prototype.bbox = function () {
    return this.element.getBoundingClientRect();
};

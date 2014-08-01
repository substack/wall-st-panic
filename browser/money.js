var createElement = require('./element.js');
module.exports = Money;

function Money (elem) {
    if (!(this instanceof Money)) return new Money(elem);
    
    this.element = createElement('g');
    this.element.appendChild(elem);
    
    this.pos = { x: Math.random() * 595 - 485, y: -350 };
    this.v = { x: 0, y: 1 };
    this.tick(0);
}

Money.prototype.appendTo = function (target) {
    target.appendChild(this.element);
};

Money.prototype.tick = function (dt) {
    this.pos.y += dt * this.v.y;
    var tr = this.pos.x + ',' + this.pos.y;
    this.element.setAttribute('transform', 'translate(' + tr + ')');
};

var createElement = require('./element.js');

module.exports = Money;

function Money (elem) {
    if (!(this instanceof Money)) return new Money(elem);
    
    this.element = createElement('g');
    this.emoney = elem;
    this.money = [];
}

Money.prototype.appendTo = function (target) {
    target.appendChild(this.element);
};

Money.prototype.rain = function () {
    var m = {
        pos: { x: 0, y: -350 },
        v: { x: 0, y: 1 },
        element: createElement('g'),
        tick: function (dt) {
            m.pos.y += dt * m.v.y;
            var tr = m.pos.x + ',' + m.pos.y;
            m.element.setAttribute('transform', 'translate(' + tr + ')');
        }
    };
    m.element.appendChild(this.emoney.cloneNode(true));
    m.tick(0);
    
    this.money.push(m);
    this.element.appendChild(m.element);
};

Money.prototype.tick = function (dt) {
    for (var i = 0; i < this.money.length; i++) {
        this.money[i].tick(dt);
    }
}

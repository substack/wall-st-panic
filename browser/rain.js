var createElement = require('svg-create-element');
var createMoney = require('./money.js');
var collide = require('box-collide');
var inherits = require('inherits');
var EventEmitter = require('events').EventEmitter;

module.exports = Rain;
inherits(Rain, EventEmitter);

function Rain (elem) {
    if (!(this instanceof Rain)) return new Rain(elem);
    EventEmitter.call(this);
    
    this.element = createElement('g');
    this.emoney = elem;
    this.money = [];
}

Rain.prototype.appendTo = function (target) {
    target.appendChild(this.element);
};

Rain.prototype.drop = function (n) {
    var self = this;
    var m = createMoney(this.emoney.cloneNode(true), n);
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
        
        if (collide(player.bbox(), m.bbox())) {
            this.remove(m);
            this.emit('cash', m.cash)
        }
    }
};

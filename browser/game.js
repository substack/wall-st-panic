var Bank = require('./bank.js');
var Player = require('./player.js');

var Sprite = require('box-sprite-svg');
var collide = require('box-collide');

var inherits = require('inherits');
var EventEmitter = require('events').EventEmitter;

var fs = require('fs');
var imsrc = fs.readFileSync(__dirname + '/../static/images/game.svg', 'utf8');

module.exports = Game;
inherits(Game, EventEmitter);

function Game () {
    var self = this;
    if (!(this instanceof Game)) return new Game;
    var root = document.createElement('div');
    this.element = root;
    root.innerHTML = imsrc;
    
    this.elements = {
        homeless: '#homeless',
        protester: '#protester',
        tent: '#tent',
        barrel: '#barrel',
        money: '#money'
    };
    this.parents = {};
    
    Object.keys(self.elements).forEach(function (key) {
        var e = root.querySelector('svg ' + self.elements[key]);
        self.elements[key] = e;
        self.parents[key] = e.parentNode;
        e.parentNode.removeChild(e);
    });
    
    this.player = Player(root.querySelector('#player'));
    this.sprites = [];
}

Game.prototype.tick = function (dt) {
    this.player.tick(dt);
    var pbox = this.player.bbox();
    
    for (var i = 0; i < this.sprites.length; i++) {
        var a = this.sprites[i];
        a.tick(dt);
        if (collide(a.bbox(), pbox)) {
            this.emit('collide', a);
        }
    }
};

Game.prototype.appendTo = function (target) {
    if (typeof target === 'string') target = document.querySelector(target);
    target.appendChild(this.element);
    this.bank = Bank(this.element);
    this.bank.set(1000000);
    return this;
};

Game.prototype.add = function (name, opts) {
    var self = this;
    var sp = Sprite(this.elements[name].cloneNode(true));
    if (!opts) opts = {};
    sp.name = name;
    sp.once('tick', function () {
        sp.appendTo(self.parents[name])
    });
    this.sprites.push(sp);
    return sp;
};

Game.prototype.remove = function (sp) {
    var ix = this.sprites.indexOf(sp);
    this.sprites.splice(ix, 1);
    sp.element.parentNode.removeChild(sp.element);
};

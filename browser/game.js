var Bank = require('./bank.js');
var Player = require('./player.js');
var Rain = require('./rain.js');

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
        player: '#player',
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
    
    this.bank = Bank(root);
    this.bank.set(0);
    this.player = Player(this.elements.player).appendTo(this.parents.player);
    
    this.rain = Rain(this.elements.money);
    this.rain.on('cash', function (n) {
        self.bank.deposit(n);
    });
    this.rain.appendTo(root.querySelector('svg'));
    
    this.agitators = [];
}

Game.prototype.tick = function (dt) {
    var self = this;
    
    this.player.tick(dt);
    this.rain.tick(dt);
    
    var pbox = this.player.bbox();
    this.rain.check(pbox);
    
    this.agitators.forEach(function (a) {
        a.tick(dt);
        if (collide(a.bbox(), pbox)) {
            self.emit('collide', a);
        }
    });
};

Game.prototype.appendTo = function (target) {
    if (typeof target === 'string') target = document.querySelector(target);
    target.appendChild(this.element);
    return this;
};

Game.prototype.create = function (name) {
    var sp = Sprite(this.elements[name].cloneNode(true));
    sp.appendTo(this.parents[name]);
    this.agitators.push(sp);
    return sp;
};

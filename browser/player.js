var createElement = require('./element.js');

module.exports = Player;

function Player (elem) {
    if (!(this instanceof Player)) return new Player(elem);
    
    this.element = createElement('g');
    var gplayer = root.querySelector('svg #player');
    var gparent = gplayer.parentNode;
    
    gparent.removeChild(gplayer);
    this.element.appendChild(gplayer);
    gparent.appendChild(this.element);
    
    this.a = { x: 0, y: 0 };
    this.v = { x: 0, y: 0 };
    this.pos = { x: 0, y: 0 };
}

Player.prototype.jump = function () {
    if (this.pos.y !== 0) return;
    this.v.y = 1;
    this.a.y = -1;
};

Player.prototype.right = function () {
    this.v.x = 1;
};

Player.prototype.left = function () {
    this.v.x = -1;
};

Player.prototype.tick = function (dt) {
    this.v.y += this.a.y * dt / 200;
    this.pos.x += this.v.x * dt / 3;
    this.pos.x = Math.min(200, Math.max(-375, this.pos.x));
    this.pos.y -= this.v.y * dt * 1.2;
    
    if (this.pos.y > 0) {
        this.v.y = 0;
        this.a.y = 0;
        this.pos.y = 0;
    }
    
    var tr = this.pos.x + ',' + this.pos.y;
    this.element.setAttribute('transform', 'translate(' + tr + ')');
}

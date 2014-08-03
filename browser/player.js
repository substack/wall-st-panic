var Sprite = require('box-sprite-svg');
var inherits = require('inherits');

module.exports = Player;
inherits(Player, Sprite);

function Player (elem) {
    if (!(this instanceof Player)) return new Player(elem);
    Sprite.call(this, elem);
    
    this.on('tick', function () {
        var p = this.position;
        p.x = Math.min(200, Math.max(-375, p.x));
        if (p.y > 0) {
            this.velocity.y = 0;
            this.acceleration.y = 0;
            p.y = 0;
        }
    });
}

Player.prototype.jump = function () {
    if (this.position.y !== 0) return;
    this.velocity.y = -1450;
    this.acceleration.y = 120;
};

Player.prototype.right = function () {
    this.velocity.x = 350;
};

Player.prototype.left = function () {
    this.velocity.x = -350;
};

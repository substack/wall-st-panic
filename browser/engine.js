module.exports = Engine;

function Engine (player, rain) {
    if (!(this instanceof Engine)) return new Engine(player, rain);
    this.running = false;
    this.last = Date.now();
    this.player = player;
    this.rain = rain;
}

Engine.prototype.run = function () {
    var self = this;
    if (this.running) return;
    this.running = true;
    this.last = Date.now();
    
    (function tick () {
        self.tick();
        setTimeout(function () {
            window.requestAnimationFrame(tick);
        }, 20);
    })();
};

Engine.prototype.pause = function () {
    this.running = false;
};

Engine.prototype.toggle = function () {
    if (this.running) this.pause()
    else this.run()
};

Engine.prototype.tick = function () {
    if (!this.running) return;
    
    var now = Date.now();
    var dt = now - this.last;
    this.last = now;
    
    this.player.tick(dt);
    this.rain.tick(dt);
    this.rain.check(this.player);
};

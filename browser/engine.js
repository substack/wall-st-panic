module.exports = Engine;

function Engine (player, rain) {
    if (!(this instanceof Engine)) return new Engine(player, rain);
    this.running = false;
    this.last = Date.now();
    this.player = player;
    this.rain = rain;
    this.time = 0;
    this._timers = [];
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
    
    this.time += dt;
    var due = [];
    for (var i = 0; i < this._timers.length; i++) {
        var t = this._timers[i];
        if (t[1] <= this.time) {
            due.push(t[0]);
            this._timers.splice(i, 1);
            i --;
        }
    }
    for (var i = 0; i < due.length; i++) due[i]();
};

Engine.prototype.setTimeout = function (fn, ts) {
    this._timers.push([ fn, this.time + ts ]);
};

Engine.prototype.setInterval = function (fn, ts) {
    var self = this;
    var last = self.time;
    var f = function () {
        fn();
        var skew = ts - (self.time - last);
        last = self.time;
        self._timers.push([ f, self.time + ts + skew ]);
    };
    this._timers.push([ f, ts ]);
};

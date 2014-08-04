var createElement = require('svg-create-element');
module.exports = Bank;

function Bank (root) {
    var self = this;
    if (!(this instanceof Bank)) return new Bank(root);
    
    this.numbers = [];
    this.pos = [];
    this.elements = [];
    this.root = root.querySelector('#digit0').parentNode;
    
    for (var i = 0; i <= 20; i++) {
        var elem = root.querySelector('#digit' + i);
        if (i < 10) self.numbers.push(elem);
        self.pos.push(elem.getBoundingClientRect());
        elem.parentNode.removeChild(elem);
    }
    
    this.cash = 0;
}

Bank.prototype.set = function (n) {
    this.cash = n;
    var digits = String(n).split('').reverse();
    if (digits.length > 21) digits = Array(22).join('9');
    
    for (var i = 0; i < this.elements.length; i++) {
        var elem = this.elements[i];
        elem.parentNode.removeChild(elem);
    }
    this.elements = [];
    
    for (var i = 0; i < digits.length; i++) {
        var d = digits[i];
        var elem = this.numbers[d].cloneNode(true);
        
        var p = this.pos[i];
        var o = this.pos[d];
        
        var dx = p.left - o.left;
        var dy = p.top - o.top;
        elem.setAttribute('transform', 'translate(' + dx + ',' + dy + ')');
        
        this.root.appendChild(elem);
        this.elements.push(elem);
    }
};

Bank.prototype.deposit = function (n) {
    this.set(this.cash + n);
};

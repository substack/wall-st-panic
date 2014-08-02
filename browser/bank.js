var createElement = require('./element.js');
var numberNames = [ 
    'zero', 'one', 'two', 'three', 'four',
    'five', 'six', 'seven', 'eight', 'nine'
];

module.exports = Bank;

function Bank (root) {
    var self = this;
    if (!(this instanceof Bank)) return new Bank(root);
    
    this.numbers = [];
    this.pos = [];
    this.elements = [];
    this.root = root.querySelector('svg #zero').parentNode;
    
    numberNames.forEach(function (n) {
        var elem = root.querySelector('svg #' + n);
        self.pos.push(elem.getBoundingClientRect());
        self.numbers.push(elem);
        elem.parentNode.removeChild(elem);
    });
    this.cash = 0;
}

Bank.prototype.set = function (n) {
    this.cash = n;
    var digits = String(n).split('');
    for (var i = 0; i < this.elements.length; i++) {
        var elem = this.elements[i];
        elem.parentNode.removeChild(elem);
    }
    this.elements = [];
    var sh = 10 - digits.length;
    
    for (var i = 0; i < digits.length; i++) {
        var d = digits[i];
        var elem = this.numbers[d].cloneNode(true);
        var p = this.pos[sh+i];
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

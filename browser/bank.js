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
    this.root = root;
    
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
    
    for (var i = 0; i < digits.length; i++) {
        var d = digits[i];
        var elem = this.numbers[d].cloneNode(true);
        var p = this.pos[i];
        var o = this.pos[Number(d)];
        
        //var tr = (p.left - o.left) + ',' + (p.top - o.top);
        //elem.setAttribute('transform', 'translate(' + tr + ')');
        this.root.appendChild(elem);
        this.elements.push(elem);
    }
};

Bank.prototype.deposit = function (n) {
    this.set(this.cash + n);
};

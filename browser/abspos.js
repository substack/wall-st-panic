module.exports = function (elem) {
    var bbox = elem.getBoundingClientRect(elem);
    return {
        x: (bbox.left + bbox.right) / 2,
        y: (bbox.top + bbox.bottom) / 2
    };
};

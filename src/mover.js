// Generated by CoffeeScript 1.7.1
var Mover;

Mover = (function() {
  Mover.prototype.$timeout = null;

  Mover.prototype.moves = [];

  Mover.prototype.fn = null;

  function Mover($timeout, moves, fn) {
    this.$timeout = $timeout;
    this.moves = moves;
    this.fn = fn;
    this.run();
  }

  Mover.prototype.run = function() {
    var move;
    if (this.moves.length === 0) {
      return this.fn();
    } else {
      move = this.moves.shift();
      return this.$timeout((function(_this) {
        return function() {
          move.fn();
          return _this.run();
        };
      })(this), move.ms);
    }
  };

  return Mover;

})();

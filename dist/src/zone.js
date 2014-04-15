System.register("../../src/zone", [], function() {
  "use strict";
  var __moduleName = "../../src/zone";
  var Zone = function Zone() {};
  ($traceurRuntime.createClass)(Zone, {
    canExplore: function() {
      return this.game.mode == 'home';
    },
    explore: function() {
      if (!this.canExplore())
        return;
      var oppoents = _.sample(this.opponents(), 1)[0];
      this.game.battle = new Battle(this.game, opponents);
    }
  }, {});
  return {};
});
System.get("../../src/zone" + '');

//# sourceMappingURL=zone.map

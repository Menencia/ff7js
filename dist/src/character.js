System.register("../../src/character", [], function() {
  "use strict";
  var __moduleName = "../../src/character";
  var Character = function Character(game) {
    this.game = game;
    this.level = 1;
    this.exp = 0;
    this.expMax = 100;
    this.expTotal = 0;
    this.atb = 0;
    this.atbMax = 4000;
    this.hp = this.hpMax();
    this.mp = this.mpMax();
  };
  ($traceurRuntime.createClass)(Character, {
    get atbProgress() {
      return Math.ceil((this.atb * 100) / this.atbMax);
    },
    get atbFull() {
      return this.atb === this.atbMax;
    },
    get hpMax() {
      return this.hpBase * this.level;
    },
    get mpMax() {
      return this.mpBase * this.level;
    },
    get hits() {
      var base = this.weapon.hits * this.level;
      var baseMin = Math.ceil((1 - 20 / 100) * base);
      var baseMax = Math.ceil((1 + 20 / 100) * base);
      return _.random(baseMin, baseMax);
    },
    setExp: function(p) {
      this.exp += p;
      this.expTotal += p;
      if (this.exp > this.expMax) {
        this.level++;
        this.exp -= this.expMax;
        this.expMax += Math.ceil(10 * this.level / 100 * this.expMax);
      }
    },
    get expProgress() {
      return Math.ceil((this.exp * 100) / this.expMax);
    },
    get expRemain() {
      return this.expMax - this.exp;
    },
    get skills() {
      var skills = [];
      skills.push({
        name: 'Attack',
        fn: this.weapon
      });
      return skills;
    },
    fight: function() {
      this.delay = 100;
      this.status = 'running';
      this.keepFighting();
    },
    keepFighting: function() {
      var $__0 = this;
      this.game.$timeout((function() {
        if ($__0.Game.mode !== 'fight')
          return;
        if ($__0.status === 'running') {
          $__0.atb += $__0.delay;
          $__0.atb = Math.min($__0.atb, $__0.atbMax);
        }
        if ($__0.atb === $__0.atbMax) {
          $__0.status = 'waiting';
          $__0.game.battle.commands.add(new Command($__0));
        }
        $__0.keepFighting();
      }), this.delay);
    },
    newTurn: function() {
      this.status = 'running';
      this.atb = 0;
    }
  }, {});
  return {};
});
System.get("../../src/character" + '');

//# sourceMappingURL=character.map

class Braver extends Limit {

    /**
     * @param character
     */
    constructor(character) {
        super(character);
        this.name = 'Braver';
        this.power = 100;
    }

    /**
     * @returns {string}
     */
    getName() {
        return "Braver";
    }

    /**
     * @returns {Array}
     */
    getTargetCommands() {
        var targets = [];
        for (var f of this.character.battle.groupA) {
            targets.push(new TargetCommand(f, this.character));
        }
        return targets;
    }

    /**
     * Returns random hits
     * @returns {*}
     */
    getHits() {
        var base = this.character.level * 10 + this.power + 100;
        var baseMin = Math.ceil((1 - 20/100) * base);
        var baseMax = Math.ceil((1 + 20/100) * base);
        return _.random(baseMin, baseMax);
    }

    /**
     * @param targets
     * @param fn
     */
    execute(targets, fn) {
        var $timeout = this.character.game.$timeout;

        this.animate( () => {

            // reset limit bar
            this.character.limit = 0;

            var animator = new Animator();

            // 1 hit to 1 target
            var hits = this.getHits();
            animator.add(targets[0].getDamagedAnimator(hits));

            animator.run( fn );
        });
    }

    /**
     * @param fn
     */
    animate(fn) {
        this.character.weapon.animate(fn);
    }

}
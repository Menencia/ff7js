class Weapon {

    /**
     * New weapon
     * @param character Character
     */
    constructor(character) {
        this.game = character.game;
        this.character = character;
    }

    /**
     * @returns {string}
     */
    getName() {
        return 'Attack';
    }

    /**
     * @returns {Array<TargetCommand>}
     */
    getTargetCommands() {
        var targets = [];
        for (var f in this.game.battle.groupB) {
            targets.push(new TargetCommand(f));
        }
        for (var f in this.game.battle.groupA) {
            targets.push(new TargetCommand(f));
        }
        return targets;
    }

    /**
     * @param fn
     */
    execute(fn) {
        var $timeout = this.fighter.battle.game.$timeout;

        this.model.animate( () => {

            var animator = new Animator();

            // 1 hit to 1 target
            var hits = this.model.getHits();
            animator.add(this.targets.getDamagedAnimator(hits));

            animator.run( fn );
        });

    }

    /**
     * @param fn
     */
    animate(fn) {
        var battle = this.game.battle;
        var plot = this.character.plot;
        var animator = new Animator();

        animator.add(new Animation(battle, ( () => $(`.${plot} .plot`).attr('src', '/img/sprites/cloud2.png')), 100));
        animator.add(new Animation(battle, ( () => $(`.${plot} .plot`).attr('src', '/img/sprites/cloud1.png')), 100));
        animator.add(new Animation(battle, ( () => $(`.${plot} .plot`).attr('src', '/img/sprites/cloud2.png')), 50));
        animator.add(new Animation(battle, ( () => $(`.${plot} .plot`).attr('src', '/img/sprites/cloud3.png')), 50));
        animator.add(new Animation(battle, ( () => $(`.${plot} .plot`).attr('src', '/img/sprites/cloud4.png')), 50));
        animator.add(new Animation(battle, ( () => $(`.${plot} .plot`).attr('src', '/img/sprites/cloud3.png')), 100));

        animator.run(fn);
    }

    /**
     * Returns random hits
     * @returns {*}
     */
    getHits() {
        var base = this.power + this.character.level * 10;
        var baseMin = Math.ceil((1 - 20/100) * base);
        var baseMax = Math.ceil((1 + 20/100) * base);
        return _.random(baseMin, baseMax);
    }

}

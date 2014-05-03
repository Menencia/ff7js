class Potion extends Item {

    /**
     * @param game
     */
    constructor(game) {
        super(game);
    }

    /**
     * @returns {*}
     */
    getName() {
        return 'Potion';
    }

    /**
     * @returns {Array<TargetCommand>}
     */
    getTargetCommands(character) {
        var targets = [];
        for (var f of this.game.battle.groupB) {
            targets.push(new TargetCommand(f, character));
        }
        return targets;
    }

    /**
     * @param targets
     * @param fn
     */
    execute(targets, fn) {
        this.game.battle.message = this.getName();

        this.animate( () => {

            var animator = new Animator();

            // potion to 1 target
            targets[0].hp += 150;
            targets[0].hp = Math.min(targets[0].hp, targets[0].hpMax());

            // remove potion from inventory
            var index = _.indexOf(this.game.items, this);
            this.game.items.splice(index, 1);

            animator.run( () => {

                this.game.battle.message = '';
                fn();
            });
        });
    }

    /**
     * @param fn
     */
    animate(fn) {
        var battle = this.game.battle;
        var plot = this.character.plot;
        var animator = new Animator();

        animator.add(new Animation(battle, ( () => $(`.${plot} .plot`).css('margin-right', '1px')), 40));
        animator.add(new Animation(battle, ( () => $(`.${plot} .plot`).css('margin-right', '2px')), 40));
        animator.add(new Animation(battle, ( () => $(`.${plot} .plot`).css('margin-right', '3px')), 40));
        animator.add(new Animation(battle, ( () => $(`.${plot} .plot`).css('margin-right', '4px')), 40));
        animator.add(new Animation(battle, ( () => $(`.${plot} .plot`).css('margin-right', '5px')), 40));
        animator.add(new Animation(battle, ( () => $(`.${plot} .plot`).css('margin-right', '6px')), 40));
        animator.add(new Animation(battle, ( () => $(`.${plot} .plot`).css('margin-right', '5px')), 70));
        animator.add(new Animation(battle, ( () => $(`.${plot} .plot`).css('margin-right', '4px')), 70));
        animator.add(new Animation(battle, ( () => $(`.${plot} .plot`).css('margin-right', '3px')), 70));
        animator.add(new Animation(battle, ( () => $(`.${plot} .plot`).css('margin-right', '2px')), 70));
        animator.add(new Animation(battle, ( () => $(`.${plot} .plot`).css('margin-right', '1px')), 70));
        animator.add(new Animation(battle, ( () => $(`.${plot} .plot`).css('margin-right', 0)), 70));

        animator.run(fn);
    }

}
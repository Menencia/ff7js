class Enemy extends Fighter {

    /**
     * @param game
     */
    constructor(battle) {
        super(battle);
    }

    /**
     * Ready to attack (IA)
     */
    ready() {
        this.battle.actions.push(new Action(this, this));
    }

    /**
     * @param targets
     * @param fn
     */
    execute(targets, fn) {
        if (this.action != null) {
            this.action(fn);
        } else {
            fn();
        }
    }

    /**
     * @param fn
     */
    animate(fn) {
        var battle = this.battle;
        var animator = new Animator();
        var plot = this.plot;

        animator.add(new Animation(battle, ( () => $(`.${plot} .plot`).css('margin-left', '1px')), 40));
        animator.add(new Animation(battle, ( () => $(`.${plot} .plot`).css('margin-left', '2px')), 40));
        animator.add(new Animation(battle, ( () => $(`.${plot} .plot`).css('margin-left', '3px')), 40));
        animator.add(new Animation(battle, ( () => $(`.${plot} .plot`).css('margin-left', '4px')), 40));
        animator.add(new Animation(battle, ( () => $(`.${plot} .plot`).css('margin-left', '5px')), 40));
        animator.add(new Animation(battle, ( () => $(`.${plot} .plot`).css('margin-left', '6px')), 40));
        animator.add(new Animation(battle, ( () => $(`.${plot} .plot`).css('margin-left', '5px')), 70));
        animator.add(new Animation(battle, ( () => $(`.${plot} .plot`).css('margin-left', '4px')), 70));
        animator.add(new Animation(battle, ( () => $(`.${plot} .plot`).css('margin-left', '3px')), 70));
        animator.add(new Animation(battle, ( () => $(`.${plot} .plot`).css('margin-left', '2px')), 70));
        animator.add(new Animation(battle, ( () => $(`.${plot} .plot`).css('margin-left', '1px')), 70));
        animator.add(new Animation(battle, ( () => $(`.${plot} .plot`).css('margin-left', 0)), 70));

        animator.run(fn);
    }

}
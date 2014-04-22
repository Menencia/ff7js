class Action {

    /**
     * @param name
     * @param battle
     * @param fighter Character
     */
    constructor(name, fighter) {
        this.name = name;
        this.fighter = fighter;
        this.battle = fighter.battle;

        this.isLimit = false;
    }

    /**
     * @param fn
     * @override
     */
    animate(fn) {
        this.fighter.animate(this, fn);
    }

    /**
     * @override
     */
    getTargets() {}

    /**
     * Calculate damages
     * Hits can be damages or cures, or can be a text : Missed, Blocked..
     * @param targets {Array<Fighter>}
     * @override
     */
    getHits(targets) {}

    /**
     * @param fn
     */
    execute(fn) {
        // animate the model having anim() method
        this.animate( () => {

            // after animation
            if (this.afterAnimate) {
                this.afterAnimate();
            }

            // finish turn
            fn();
        });
    }

}
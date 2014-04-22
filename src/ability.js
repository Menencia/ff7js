class Ability {

    /**
     * Only enemies have abilities
     * @param name {String}
     * @param enemy {Enemy}
     */
    constructor(name, enemy) {
        this.name = name;
        this.enemy = enemy;
    }

    /**
     * @param fn
     */
    execute(fn) {
        // animate the model having anim() method
        this.animate( this.getTargets(), () => {

            // after animation
            if (this.afterAnimate) {
                this.afterAnimate();
            }

            // finish turn
            fn();
        });
    }

    /**
     * @param targets {Array<Fighter>}
     * @param fn
     */
    animate(targets, fn) {
        this.enemy.animate(targets, fn);
    }

}
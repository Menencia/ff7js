class Animation {

    /**
     * @param battle
     * @param callback
     * @param ms
     */
    constructor(battle, callback, ms) {
        this.battle = battle;
        this.callback = callback;
        this.ms = ms;
    }

    /**
     * @param fn
     */
    run(fn) {
        this.battle.game.$timeout( () => {
            this.callback();
            fn();
        }, this.ms);
    }

}
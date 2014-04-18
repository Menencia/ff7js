class Enemy extends Fighter {

    /**
     * New Enemy
     * @param game
     */
    constructor (game) {
        super(game);
    }

    /**
     * Returns random hits
     * @returns {*}
     */
    getHits() {
        var base = this.strength;
        var baseMin = Math.ceil((1 - 20/100) * base);
        var baseMax = Math.ceil((1 + 20/100) * base);
        return _.random(baseMin, baseMax);
    }

    /**
     * Execute something when atb is full
     * IA choose automatically a skill
     */
    exec() {
        var action = new Action(this.game.battle, this);
        action.setTargets('enemies', 'random');
        action.damages(this.getHits());
        this.game.battle.actions.push(action);
    }

}
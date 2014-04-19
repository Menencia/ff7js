class LimitAction extends Action {

    /**
     * New Limit Attack action
     * Only for characters
     * @param name
     * @param limit Limit
     */
    constructor(name, limit) {
        this.animatedModel = limit;
        var battle = limit.character.game.battle;
        var character = limit.character;
        super(name, battle, character);
        this.isLimit = true;
    }

    /**
     * Deals damages
     */
    use() {
        super.use();

        // register action
        this.setTargets('enemies', 'random');
        this.damages(this.animatedModel.getHits());
        this.battle.actions.push(this);
    }

}
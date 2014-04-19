class ItemAction extends Action {

    /**
     * New Item action
     * @param name
     * @param item Item
     */
    constructor(name, item) {
        this.model = item;
        var battle = item.character.game.battle;
        var character = item.character;
        super(name, battle, character);
    }

    /**
     * Deals damages
     */
    use() {
        super.use();

        // register action
        this.setTargets('allies', 'random');
        this.damages(this.model.character.getHits());
        this.battle.actions.push(this);
    }

}
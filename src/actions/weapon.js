class WeaponAction extends Action {

    /**
     * New Attack action
     * @param name
     * @param weapon Weapon
     */
    constructor(name, weapon) {
        this.model = weapon;
        var battle = weapon.character.game.battle;
        var character = weapon.character;
        super(name, battle, character);
    }

    /**
     * Deals damages
     */
    use() {
        super.use();

        // register action
        this.setTargets('enemies', 'random');
        this.damages(this.model.character.getHits());
        this.battle.actions.push(this);
    }

}
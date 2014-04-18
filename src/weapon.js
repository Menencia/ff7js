class Weapon {

    /**
     * New weapon
     * @param game
     * @param fighter
     */
    constructor(game, fighter) {
        this.game = game;
        this.fighter = fighter;
    }

    /**
     * Deals damages
     */
    use() {
        if (this.game.mode !== 'fight') return;

        // close command window
        this.game
        .battle
        .commands
        .close();

        // register action
        var action = new Action(this.game.battle, this.fighter);
        action.setTargets('enemies', 'random');
        action.damages(this.fighter.getHits());
        this.game.battle.actions.push(action);
    }

}

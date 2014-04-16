class Weapon {

    /**
     * New weapon
     * @param Game
     * @param fighter
     */
    constructor(Game, fighter) {
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
        action.target('random');
        action.damages(this.fighter.getHits());
        this.game.battle.actions.push(action);
    }

}

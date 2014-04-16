class Battle {

    /**
     * New Battle
     * @param game
     * @param opponents
     */
    constructor (game, opponents) {
        this.game = game;
        this.opponents = opponents;
        this.actions = [];
        this.action = null;
        this.exp = this.gil = this.ap = 0;
        this.commands = new Commands(this);
        this.game.setMode('fight');
        for (opponent of this.opponents) {
            opponent.fight();
        }
        for (character of this.game.getTeam()) {
            character.fight();
        }
        this.run();
    }

    /**
     * Checks and executes actions
     */
    run() {
        this.Game.$timeout(=>
            if (this.actions.length > 0) {
                this.action = this.actions.shift();
                this.action.exec(() => {
                    this.action.fighter.newTurn();
                    this.action = null;
                });
            }
            this.run();
        , 1000);
    }

    /**
     * End of the battle
     */
    end() {
        var remaining = _.filter(this.opponents, function(enemy) {enemy.hp > 0}).length;
        if (remaining === 0) {
            this.opponents = [];
            this.game.setMode('rewards');
            for (character of this.game.getTeam()) {
                character.setEXP(this.exp);
            }
            this.game.setGil(this.gil);
        }
    }

}
class Battle {

    /**
     * New Battle between 2 groups
     * GroupA is at the left
     * GroupB is at the right
     * @param game
     * @param groupA
     * @param groupB
     */
    constructor (game, groupA, groupB) {
        this.game = game;
        this.groupA = groupA;
        this.groupB = groupB;

        this.actions = [];
        this.action = null;
        this.exp = this.gil = this.ap = 0;
        this.commands = new Commands(this);

        this.game.setMode('fight');
        for (var f of this.groupA) {
            f.group = 'A';
            f.fight();
        }
        for (var f of this.groupB) {
            f.group = 'B';
            f.fight();
        }
        this.run();
    }

    /**
     * Checks and executes actions
     */
    run() {
        this.game.$timeout( () => {
            if (this.actions.length > 0) {
                this.action = this.actions.shift();
                this.action.exec( () => {
                    this.action.fighter.newTurn();
                    this.action = null;
                });
            }
            this.run();
        }, 1000);
    }

    /**
     * End of the battle
     */
    end() {
        var remaining = _.filter(this.opponents, function(enemy) {return (enemy.hp > 0);}).length;
        if (remaining === 0) {
            this.opponents = [];
            this.game.setMode('rewards');
            for (var character of this.game.getTeam()) {
                character.setEXP(this.exp);
            }
            this.game.setGil(this.gil);
        }
    }

}
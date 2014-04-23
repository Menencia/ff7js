class Battle {

    /**
     * New Battle between 2 groups
     * GroupA is at the left
     * GroupB is at the right
     * @param game
     * @param groupA {Array<Fighter>}
     * @param groupB {Array<Fighter>}
     */
    constructor (game, groupA, groupB) {
        this.game = game;
        this.groupA = groupA;
        this.groupB = groupB;

        this.actions = [];
        this.action = null;
        this.exp = this.gil = this.ap = 0;
        this.commander = new Commander(this);
        this.message = '';

        this.game.setMode('fight');
        for (var f of this.groupA) {
            f.group = 'A';
            f.battle = this;
            f.fight();
        }
        for (var f of this.groupB) {
            f.group = 'B';
            f.battle = this;
            f.fight();
        }
        this.run();
    }

    /**
     * Checks and executes awaiting actions
     */
    run() {
        this.running = this.game.$timeout( () => {
            if (!this.pause && this.actions.length > 0) {

                // stop time
                this.pause = true;

                // get next action
                var action = this.actions.shift();

                // and do it
                action.execute( () => {

                    // pause over
                    this.pause = false;
                    // and show goes on
                    action.fighter.newTurn();

                    // test end of game
                    if (this.testEnd()) {
                        this.end();
                    }
                });
            }
            this.run();
        }, 1000);
    }

    /**
     * Test if the group is unable to fight (means victory for other group)
     * - All the party group has 0 HP
     * @param group
     */
    testEnd() {
        var groupA = _.filter(this.groupA, function(fighter) {return (fighter.hp > 0);}).length;
        var groupB = _.filter(this.groupB, function(fighter) {return (fighter.hp > 0);}).length;
        if (groupB === 0) {
            this.gameOver();
        } else if (groupA === 0) {
            this.win();
        }
    }

    /**
     * End of the battle
     */
    win() {
        var remaining = _.filter(this.groupA, function(fighter) {return (fighter.hp > 0);}).length;
        if (remaining === 0) {

            // Cancel timeouts
            var groups = _.union(this.groupA, this.groupB);
            for (var f of groups) {
                this.game.$timeout.cancel(f.fighting);
            }
            this.game.$timeout.cancel(this.running);

            this.game.setMode('rewards');
            for (var fighter of this.groupA) {
                this.exp += fighter.exp;
                this.gil += fighter.gil;
                this.ap += fighter.ap;
            }
            for (var fighter of this.groupB) {
                fighter.setEXP(this.exp);
            }
            this.game.setGil(this.gil);
        }
    }

    /**
     * End game
     */
    gameOver() {
        this.game.setMode('game-over');
    }

}
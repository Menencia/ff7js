class Battle {

    /**
     * New Battle between 2 groups
     * GroupA is at the left
     * GroupB is at the right
     * @param game
     * @param groupA Array<Fighter>
     * @param groupB Array<Fighter>
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
        this.running = this.game.$timeout( () => {
            if (!this.pause && this.actions.length > 0) {
                this.pause = true;
                this.action = this.actions.shift();
                this.message = this.action.name;
                this.action.exec( () => {
                    this.action.fighter.newTurn();
                    this.action = null;
                    this.message = '';
                    this.pause = false;
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
    testEnd(group) {
        var remaining = _.filter(this['group' + group], function(fighter) {return (fighter.hp > 0);}).length;
        if (remaining === 0 && group == 'A') {
            this.end();
        } else {
            this.gameOver();
        }
    }

    /**
     * End of the battle
     */
    end() {
        var remaining = _.filter(this.groupA, function(fighter) {return (fighter.hp > 0);}).length;
        if (remaining === 0) {

            // Cancel timeouts
            var groups = _.union(this.groupA, this.groupB);
            for (var f in groups) {
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
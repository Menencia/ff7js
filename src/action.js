class Action {

    /**
     * New Action
     * @param name
     * @param battle
     * @param fighter Character|Enemy
     */
    constructor (name, battle, fighter) {
        this.battle = battle;
        this.fighter = fighter;
        this.hits = 0;
        this.targets = [];
        this.name = name;
        this.isLimit = false;
    }

    /**
     * When action is selected from the command
     */
    use() {
        // close command window
        this.battle.commander.close();
        new Sound('/sounds/ff7move.wav');
    }

    /**
     * Assign targets
     * @param key
     */
    setTargets (type, key) {
        var opponents;

        switch (type) {
            case 'allies':
                opponents = this.battle['group' + this.fighter.group];
                break;
            case 'enemies':
                var letter = (this.fighter.group === 'A') ? 'B': 'A';
                opponents = this.battle['group' + letter];
                break;
        }

        switch (key) {
            case 'random':
                this.targets = [_.sample(opponents)];
                break;
        }
    }

    /**
     * Set damages done by the action
     */
    damages (hits) {
        this.hits = hits;
    }

    /**
     * Execute an action
     * An action is composed by moves
     * Executes fn when moves finished
     */
    exec(fn) {
        // animate the model having anim() method
        this.model.animate( this.targets, () => {

            // after animation
            if (this.model.afterAnimate) {
                this.model.afterAnimate();
            }

            // finish turn
            fn();
        });
    }

}
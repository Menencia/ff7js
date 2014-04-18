class Action {

    /**
     * New Action
     * @param battle
     * @param fighter
     */
    constructor (battle, fighter) {
        this.battle = battle;
        this.fighter = fighter;
        this.hits = 0;
        this.targets = [];
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
        this.model.anim( this.targets, () => {
            for (var target of this.targets) {
                target.getDamaged(this.hits);
            }
            fn();
        });
    }

}
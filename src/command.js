class Command {

    /**
     * @param model {Weapon|Limit|Item|Ability}
     * @param fighter {Character|Enemy}
     */
    constructor (model, fighter) {
        this.model = model;
        this.fighter = fighter;
        this.battle = fighter.battle;
        this.targets = [];
        this.isLimit = false;
    }

    /**
     * Returns targets for current action
     * @returns {Array<Command>}
     */
    getTargets() {
        return [];
    }

    /**
     * When action is selected from the commandsPanel
     * Then show targets commandsPanel
     */
    select() {
        this.battle.commander.current.add(new CommandsPanel(this.getTargets()));
    }

    /**
     * When target is selected from the commandsPanel
     * Then register the command
     */
    use() {
        // register command
        this.battle.commands.push(this);

        // close commandsPanel window
        this.battle.commander.close();

        new Sound('/sounds/ff7move.wav');
    }

    /**
     * Assign targets
     * @param type
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
     * Execute an action
     * An action is composed by moves
     * Executes fn when moves finished
     */
    execute(fn) {
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
class Command {

    /**
     * @param model
     * @param character
     */
    constructor (model, character) {
        this.model = model;
        this.character = character;
        this.battle = character.battle;
        this.targets = [];
        this.action = null;
    }

    /**
     * @returns {*}
     */
    getName() {
       return this.model.getName();
    }

    /**
     * @param targets
     */
    setTargets(targets) {
        this.targets = targets;
    }

    /**
     * When command is selected, open the targets panel
     */
    select() {
        this.battle.commander.current.action = new Action(this.model, this.character);
        this.battle.commander.current.select(new TargetsCommandsPanel(this.model, this.character));
    }

}
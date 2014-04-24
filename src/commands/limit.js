class LimitCommand extends Command {

    /**
     * @param limit
     */
    constructor(limit) {
        var model = limit;
        var character = limit.character;
        super(model, character);
    }

    /**
     * When command is selected, open the targets panel
     */
    select() {
        this.battle.commander.current.action = new LimitAction(this.model, this.character);
        this.battle.commander.current.select(new TargetsCommandsPanel(this.model));
    }

}
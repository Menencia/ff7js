class TargetCommand extends Command {

    /**
     * @param target
     * @param character
     */
    constructor(target, character) {
        super(target, character);
    }

    /**
     * Select Target, Then close current Character Commander
     */
    select() {
        this.character.battle.commander.current.action.targets = this.model;
        this.character.battle.actions.push(this.character.battle.commander.current.action);
        this.character.battle.commander.close();
    }

}
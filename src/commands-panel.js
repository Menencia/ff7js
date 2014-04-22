class CommandsPanel {

    /**
     * @param character {Character}
     * @param commands {Array<Command>}
     */
    constructor(character, commands) {
        this.character = character;
        this.commands = commands;
    }

    /**
     *
     */
    select() {
        this.character.game.battle.commander.current.add(this);
    }

}

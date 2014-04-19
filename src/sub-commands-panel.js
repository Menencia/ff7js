class SubCommandsPanel extends CommandsPanel {

    /**
     * SubCommandsPanel display when there are subcommands
     * @param character
     * @param commands
     */
    constructor(character, commands) {
        super(character, commands);
        this.isLimit = false;
    }

    /**
     * Opens the window
     */
    use() {
        this.character.game.battle.commander.subcurrent = this;
    }

    /**
     * Close the window
     */
    close() {
        this.character.game.battle.commander.subcurrent = null;
    }

}
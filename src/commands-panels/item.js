class ItemCommandsPanel extends CommandsPanel {

    /**
     * @param character {Character}
     */
    constructor(character) {
        var commands = [];
        for (var item of character.game.items) {
            commands.push(new ItemCommand(item));
        }
        super(character, commands);
    }

}
class ItemCommandsPanel extends CommandsPanel {

    /**
     * @param character {Character}
     */
    constructor(character) {
        var commands = [];
        for (var item of character.game.items) {
            commands.push(new ItemCommand(item, character));
        }
        super(character, commands);
    }

    /**
     * @returns {string}
     */
    getName() {
        return "Item";
    }

}
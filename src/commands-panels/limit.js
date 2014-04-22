class LimitPanelCommand extends Command {

    /**
     * @param character
     */
    constructor(character) {
        var commands = [];
        for (var limit of character.limits) {
            commands.push(new LimitCommand(limit));
        }
        super(character, commands);
    }

}
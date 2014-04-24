class LimitCommandsPanel extends CommandsPanel {

    /**
     * @param character
     */
    constructor(character) {
        var commands = [];
        for (var limit of character.limits) {
            commands.push(new LimitCommand(limit));
        }

        super(character, commands);

        /**
         * @type {boolean}
         */
        this.isLimit = true;
    }

    /**
     * @returns {string}
     */
    getName() {
        return "Limit";
    }

}
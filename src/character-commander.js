/**
 * @class CharacterCommander
 */
class CharacterCommander {

    /**
     * @param character
     * @param commandsPanel
     */
    constructor(character, commandsPanel) {
        /**
         * @type {Character}
         */
        this.character = character;

        /**
         * @type {Array<CommandsPanel>}
         */
        this.panels = [commandsPanel];

        /**
         * @type {Action}
         */
        this.action = null;
    }

    /**
     * @param commandsPanel {CommandsPanel}
     */
    select(commandsPanel) {
        this.panels.push(commandsPanel);
    }

}

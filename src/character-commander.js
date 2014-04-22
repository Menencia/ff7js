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
    }

    /**
     * @param commandsPanel {CommandsPanel}
     */
    add(commandsPanel) {
        this.panels.push(commandsPanel);
    }

}

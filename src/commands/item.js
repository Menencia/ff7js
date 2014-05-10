class ItemCommand extends Command {

    /**
     * @param item
     * @param character
     */
    constructor(item, character) {
        super(item, character);
    }

    /**
     * @returns {string}
     */
    getName() {
        return this.model.getName();
    }

}
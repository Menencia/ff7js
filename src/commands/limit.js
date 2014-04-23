class LimitCommand extends Command {

    /**
     * @param limit
     */
    constructor(limit) {
        var model = limit;
        var character = limit.character;
        super(model, character);
    }

}
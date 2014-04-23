class Action {

    /**
     * @param model
     * @param fighter
     */
    constructor(model, fighter) {
        this.fighter = fighter;
        this.model = model;
        this.targets = null;
    }

    /**
     * @param fn
     */
    execute(fn) {
        this.model.execute(fn);
    }

}
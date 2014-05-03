class Action {

    /**
     * @param model
     * @param fighter
     */
    constructor(model, fighter) {
        this.fighter = fighter;
        this.model = model;
        this.model.character = fighter;
        this._targets = null;
    }

    /**
     * @param targets
     */
    set targets(targets) {
        if (!_.isArray(targets)) {
            targets = [targets];
        }
        this._targets = targets;
    }

    /**
     * @returns {*}
     */
    get targets() {
        return this._targets;
    }

    /**
     * @param fn
     */
    execute(fn) {
        this.model.execute(this.targets, fn);
    }

}
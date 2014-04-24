class Action {

    /**
     * @param model
     * @param fighter
     */
    constructor(model, fighter) {
        this.fighter = fighter;
        this.model = model;
        this._targets = null;
    }

    /**
     *
     */
    isLimit() {
        return this.model
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
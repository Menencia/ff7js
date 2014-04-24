class LimitAction extends Action {

    constructor(model, fighter) {
        super(model, fighter);

        /**
         * @type {boolean}
         */
        this.isLimit = true;
    }

}
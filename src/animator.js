class Animator {

    /**
     *
     */
    constructor() {
        this.list = [];
    }

    /**
     * @param moves {Animation|Animator}
     */
    add(moves) {
        if (!_.isArray(moves)) {
            moves = [moves];
        }
        for (var move of moves) {
            this.list.push([move]);
        }
    }

    /**
     * @param moves {Array<Animation>|Array<Animator>}
     */
    addMultiple(moves) {
        this.list.push(moves);
    }

    /**
     * @param fn
     * @returns {*}
     */
    run(fn) {
        if (this.list.length === 0) {
            return fn();
        }

        var node = this.list.shift();
        this.tokens = node.length;

        /**
         * {Animation|Animator}
         */
        var a;

        for (a of node) {

            a.run( () => {
                if (--this.tokens === 0) {
                    this.run(fn);
                }
            });

        }
    }

}

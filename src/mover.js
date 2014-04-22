class Mover {

    /**
     * @param $timeout
     */
    constructor ($timeout) {
        this.$timeout = $timeout;
        this.list = [];
    }

    /**
     * @param moves {Move|Array<Move>}
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
     * @param moves
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

        var moves = this.list.shift();
        this.tokens = moves.length;

        for (var move of moves) {
            this.$timeout( () => {
                move.fn();
                this.tokens--;
                if (this.tokens == 0) {
                    this.run(fn);
                }
            }, move.ms);
        }
    }

}

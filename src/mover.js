class Mover {

    /**
     * New Mover
     */
    constructor ($timeout, moves, fn) {
        this.$timeout = $timeout;
        this.moves = moves;
        this.fn = fn;
        this.run();
    }

    /**
     * Run the mover
     */
    run() {
        if (moves.length === 0) {
            this.fn();
        } else {
            var move = this.moves.shift();
            this.$timeout(=>
                move.fn();
                this.run();
            , move.ms);
        }
    }

}

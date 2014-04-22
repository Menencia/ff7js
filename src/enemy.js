class Enemy extends Fighter {

    /**
     * @param game
     */
    constructor(battle) {
        super(battle);
    }

    /**
     * Ready to attack (IA)
     */
    ready() {
        this.battle.actions.push(this);
    }

    execute(fn) {
        if (this.action != null) {
            this.action(fn);
        } else {
            fn();
        }
    }

    /**
     * Animation attack
     * @param action
     * @param fn
     * @override
     */
    animate(action, fn) {
        var moves = [];
        var plot = this.plot;

        moves.push(new Move(( () => $(`.${plot} .plot`).css('margin-left', '1px')), 40));
        moves.push(new Move(( () => $(`.${plot} .plot`).css('margin-left', '2px')), 40));
        moves.push(new Move(( () => $(`.${plot} .plot`).css('margin-left', '3px')), 40));
        moves.push(new Move(( () => $(`.${plot} .plot`).css('margin-left', '4px')), 40));
        moves.push(new Move(( () => $(`.${plot} .plot`).css('margin-left', '5px')), 40));
        moves.push(new Move(( () => $(`.${plot} .plot`).css('margin-left', '6px')), 40));
        moves.push(new Move(( () => $(`.${plot} .plot`).css('margin-left', '5px')), 70));
        moves.push(new Move(( () => $(`.${plot} .plot`).css('margin-left', '4px')), 70));
        moves.push(new Move(( () => $(`.${plot} .plot`).css('margin-left', '3px')), 70));
        moves.push(new Move(( () => $(`.${plot} .plot`).css('margin-left', '2px')), 70));
        moves.push(new Move(( () => $(`.${plot} .plot`).css('margin-left', '1px')), 70));
        moves.push(new Move(( () => $(`.${plot} .plot`).css('margin-left', 0)), 70));

        new Mover(this.battle.game.$timeout, moves, fn);
    }

}
class Item {

    /**
     * New item
     * @param game
     */
    constructor(game) {
        this.game = game;
    }

    /**
     * Animation for item
     * No move for character
     * @param targets
     * @param fn
     */
    animate(targets, fn) {
        var moves = [];

        var cure = this.use();
        var plot = targets[0].plot;

        moves.push(new Move(( () => $(`.${plot} .msg`).text(cure)), 0));
        moves.push(new Move(( () => $(`.${plot} .msg`).css({top: '-1px', opacity: 0.9})), 0));
        moves.push(new Move(( () => $(`.${plot} .msg`).css({top: '-2px', opacity: 0.9})), 70));
        moves.push(new Move(( () => $(`.${plot} .msg`).css({top: '-3px', opacity: 0.8})), 70));
        moves.push(new Move(( () => $(`.${plot} .msg`).css({top: '-4px', opacity: 0.8})), 70));
        moves.push(new Move(( () => $(`.${plot} .msg`).css({top: '-5px', opacity: 0.7})), 70));
        moves.push(new Move(( () => $(`.${plot} .msg`).css({top: '-6px', opacity: 0.7})), 70));
        moves.push(new Move(( () => $(`.${plot} .msg`).css({top: '-7px', opacity: 0.6})), 70));
        moves.push(new Move(( () => $(`.${plot} .msg`).css({top: '-8px', opacity: 0.6})), 70));
        moves.push(new Move(( () => $(`.${plot} .msg`).css({top: '-9px', opacity: 0.5})), 70));
        moves.push(new Move(( () => $(`.${plot} .msg`).css({top: '-10px', opacity: 0.5})), 70));
        moves.push(new Move(( () => $(`.${plot} .msg`).text('')), 40));

        new Mover(this.character.game.$timeout, moves, () => {
            targets[0].getCured(cure);
            fn();
        });
    }

}
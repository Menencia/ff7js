class Enemy extends Fighter {

    /**
     * New Enemy
     * @param game
     */
    constructor (game) {
        super(game);
    }

    /**
     * Returns random hits
     * @returns {*}
     */
    getHits() {
        var base = this.strength;
        var baseMin = Math.ceil((1 - 20/100) * base);
        var baseMax = Math.ceil((1 + 20/100) * base);
        return _.random(baseMin, baseMax);
    }

    /**
     * Execute something when atb is full
     * IA choose automatically a skill
     */
    exec() {
        var action = new Action('Laser Cannon', this.game.battle, this);
        action.setTargets('enemies', 'random');
        action.damages(this.getHits());
        action.model = this;
        this.game.battle.actions.push(action);
    }

    /**
     * /**
     * Animation for attack
     * Animation (mover) consists of moves.
     * @param fn
     */
    animate(targets, fn) {
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

        var hits = this.getHits();
        var plot2 = targets[0].plot;

        moves.push(new Move(( () => $(`.${plot2} .msg`).text(hits)), 0));
        moves.push(new Move(( () => $(`.${plot2} .msg`).css({top: '-1px', opacity: 0.9})), 0));
        moves.push(new Move(( () => $(`.${plot2} .msg`).css({top: '-2px', opacity: 0.9})), 70));
        moves.push(new Move(( () => $(`.${plot2} .msg`).css({top: '-3px', opacity: 0.8})), 70));
        moves.push(new Move(( () => $(`.${plot2} .msg`).css({top: '-4px', opacity: 0.8})), 70));
        moves.push(new Move(( () => $(`.${plot2} .msg`).css({top: '-5px', opacity: 0.7})), 70));
        moves.push(new Move(( () => $(`.${plot2} .msg`).css({top: '-6px', opacity: 0.7})), 70));
        moves.push(new Move(( () => $(`.${plot2} .msg`).css({top: '-7px', opacity: 0.6})), 70));
        moves.push(new Move(( () => $(`.${plot2} .msg`).css({top: '-8px', opacity: 0.6})), 70));
        moves.push(new Move(( () => $(`.${plot2} .msg`).css({top: '-9px', opacity: 0.5})), 70));
        moves.push(new Move(( () => $(`.${plot2} .msg`).css({top: '-10px', opacity: 0.5})), 70));
        moves.push(new Move(( () => $(`.${plot2} .msg`).text('')), 40));

        new Mover(this.game.$timeout, moves, () => {
            targets[0].getDamaged(hits);
            fn();
        });
    }

}
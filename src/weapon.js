class Weapon {

    /**
     * New weapon
     * @param game
     * @param fighter
     */
    constructor(game, fighter) {
        this.game = game;
        this.fighter = fighter;
    }

    /**
     * Deals damages
     */
    use() {
        if (this.game.mode !== 'fight') return;

        // close command window
        this.game
        .battle
        .commands
        .close();

        // register action
        var action = new Action(this.game.battle, this.fighter);
        action.setTargets('enemies', 'random');
        action.damages(this.fighter.getHits());
        action.model = this;
        this.game.battle.actions.push(action);
    }

    /**
     * Animation for attack
     * Animation (mover) consists of moves.
     * @param fn
     */
    anim(targets, fn) {
        var moves = [];
        var plot = this.fighter.plot;

        moves.push(new Move(( () => $(`.${plot} .plot`).attr('src', '/img/sprites/cloud2.png')), 100));
        moves.push(new Move(( () => $(`.${plot} .plot`).attr('src', '/img/sprites/cloud1.png')), 100));
        moves.push(new Move(( () => $(`.${plot} .plot`).attr('src', '/img/sprites/cloud2.png')), 50));
        moves.push(new Move(( () => $(`.${plot} .plot`).attr('src', '/img/sprites/cloud3.png')), 50));
        moves.push(new Move(( () => $(`.${plot} .plot`).attr('src', '/img/sprites/cloud4.png')), 50));
        moves.push(new Move(( () => $(`.${plot} .plot`).attr('src', '/img/sprites/cloud3.png')), 100));

        var plot2 = targets[0].plot;

        moves.push(new Move(( () => $(`.${plot2} .msg`).text(this.hits)), 0));
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

        new Mover(this.game.$timeout, moves, fn);
    }

}

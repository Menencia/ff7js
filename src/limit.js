class Limit {

    /**
     * Creates new limit
     * Only for characters
     * @param character
     */
    constructor(character) {
        this.character = character;
    }

    /**
     * Returns random hits
     * @returns {*}
     */
    getHits() {
        var base = this.character.level * 10 + this.power;
        var baseMin = Math.ceil((1 - 20/100) * base);
        var baseMax = Math.ceil((1 + 20/100) * base);
        return _.random(baseMin, baseMax);
    }

    /**
     * Animation for liimt
     * Cloud moves his weapon, and we show the damages above the enemy (1 hit)
     * @param targets
     * @param fn
     */
    animate(targets, fn) {
        var moves = [];
        var plot = this.character.plot;

        moves.push(new Move(( () => $(`.${plot} .plot`).attr('src', '/img/sprites/cloud2.png')), 100));
        moves.push(new Move(( () => $(`.${plot} .plot`).attr('src', '/img/sprites/cloud1.png')), 100));
        moves.push(new Move(( () => $(`.${plot} .plot`).attr('src', '/img/sprites/cloud2.png')), 50));
        moves.push(new Move(( () => $(`.${plot} .plot`).attr('src', '/img/sprites/cloud3.png')), 50));
        moves.push(new Move(( () => $(`.${plot} .plot`).attr('src', '/img/sprites/cloud4.png')), 50));
        moves.push(new Move(( () => $(`.${plot} .plot`).attr('src', '/img/sprites/cloud3.png')), 100));

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

        new Mover(this.character.game.$timeout, moves, () => {
            targets[0].getDamaged(hits);
            fn();
        });
    }

    /**
     * Actions after the animation
     */
    afterAnimate() {
        this.character.limit = 0;
    }

}
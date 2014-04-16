class Action {

    /**
     * New Action
     * @param battle
     * @param fighter
     */
    constructor (battle, fighter) {
        this.battle = battle;
        this.fighter = fighter;
        this.plot = '.plot';
        this.hits = 0;
        this.targets = [];
    }

    /**
     * Assign targets
     * @param key
     */
    target (key) {
        switch (key)
            when 'random'
                this.targets = [_.sample(this.battle.opponents)]
    }

    /**
     * Set damages done by the action
     */
    damages (hits) {
        this.hits = hits;
    }

    /**
     * Execute an action
     * An action is composed by moves
     */
    exec (fn) {
        var moves = [];

        moves.push(new Move((=> $(this.plot).attr('src', '/img/sprites/cloud2.png')), 100));
        moves.push(new Move((=> $(this.plot).attr('src', '/img/sprites/cloud1.png')), 100));
        moves.push(new Move((=> $(this.plot).attr('src', '/img/sprites/cloud2.png')), 50));
        moves.push(new Move((=> $(this.plot).attr('src', '/img/sprites/cloud3.png')), 50));
        moves.push(new Move((=> $(this.plot).attr('src', '/img/sprites/cloud4.png')), 50));
        moves.push(new Move((=> $(this.plot).attr('src', '/img/sprites/cloud3.png')), 100));

        moves.push(new Move((=> $('.msg').text(this.hits)), 0));
        moves.push(new Move((=> $('.msg').css({top: '-1px', opacity: 0.9})), 0));
        moves.push(new Move((=> $('.msg').css({top: '-2px', opacity: 0.9})), 70));
        moves.push(new Move((=> $('.msg').css({top: '-3px', opacity: 0.8})), 70));
        moves.push(new Move((=> $('.msg').css({top: '-4px', opacity: 0.8})), 70));
        moves.push(new Move((=> $('.msg').css({top: '-5px', opacity: 0.7})), 70));
        moves.push(new Move((=> $('.msg').css({top: '-6px', opacity: 0.7})), 70));
        moves.push(new Move((=> $('.msg').css({top: '-7px', opacity: 0.6})), 70));
        moves.push(new Move((=> $('.msg').css({top: '-8px', opacity: 0.6})), 70));
        moves.push(new Move((=> $('.msg').css({top: '-9px', opacity: 0.5})), 70));
        moves.push(new Move((=> $('.msg').css({top: '-10px', opacity: 0.5})), 70));
        moves.push(new Move((=> $('.msg').text('')), 40));

        new Mover(this.battle.Game.$timeout, moves, =>
            for (target of this.targets) {
                target.getDamaged(this.hits);
            }
            fn();
        );
    }

}
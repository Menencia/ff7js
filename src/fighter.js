class Fighter {

    /**
     * @param battle
     */
    constructor (battle) {
        this.battle = battle;
        this.level = 1;
        this.atb = 0;
        this.atbMax = 4000;
        this.hp = this.hpMax();
        this.mp = this.mpMax();
    }

    /**
     * @returns {string}
     */
    getName() {
        return this.name;
    }

    /**
     * Returns calculated total HP
     * @returns {number}
     */
    hpMax() {
        return this.hpBase * this.level;
    }

    /**
     * Returns calculated total MP
     * @returns {number}
     */
    mpMax() {
        return this.mpBase * this.level;
    }

    /**
     * Begins fighting
     */
    fight() {
        this.delay = 100;
        this.status = 'running';
        this.keepFighting();
    }

    /**
     * Fighting process
     */
    keepFighting() {
        this.fighting = this.battle.game.$timeout( () => {
            if (this.battle == null) return;
            if (this.status === 'running') {
                this.atb += this.delay;
                this.atb = Math.min(this.atb, this.atbMax);
                if (this.atb === this.atbMax) {
                    this.status = 'waiting';
                    this.ready();
                }
            }
            this.keepFighting()
        }, this.delay);
    }

    /**
     * New turn
     */
    newTurn() {
        this.status = 'running';
        this.atb = 0;
    }

    /**
     * Fighter receives damages
     * @param damages
     * @returns {Animator}
     */
    getDamagedAnimator(damages) {
        this.hp -= damages;
        this.hp = Math.max(this.hp, 0);
        if (this.getLimit) {
            this.getLimit(damages);
        }

        if (this.hp === 0) {
            // todo death animation
        }

        var battle = this.battle;
        var plot = this.plot;
        var animator = new Animator();

        animator.add(new Animation(battle, ( () => $(`.${plot} .msg`).text(damages)), 0));
        animator.add(new Animation(battle, ( () => $(`.${plot} .msg`).css({top: '-1px', opacity: 0.9})), 0));
        animator.add(new Animation(battle, ( () => $(`.${plot} .msg`).css({top: '-2px', opacity: 0.9})), 70));
        animator.add(new Animation(battle, ( () => $(`.${plot} .msg`).css({top: '-3px', opacity: 0.8})), 70));
        animator.add(new Animation(battle, ( () => $(`.${plot} .msg`).css({top: '-4px', opacity: 0.8})), 70));
        animator.add(new Animation(battle, ( () => $(`.${plot} .msg`).css({top: '-5px', opacity: 0.7})), 70));
        animator.add(new Animation(battle, ( () => $(`.${plot} .msg`).css({top: '-6px', opacity: 0.7})), 70));
        animator.add(new Animation(battle, ( () => $(`.${plot} .msg`).css({top: '-7px', opacity: 0.6})), 70));
        animator.add(new Animation(battle, ( () => $(`.${plot} .msg`).css({top: '-8px', opacity: 0.6})), 70));
        animator.add(new Animation(battle, ( () => $(`.${plot} .msg`).css({top: '-9px', opacity: 0.5})), 70));
        animator.add(new Animation(battle, ( () => $(`.${plot} .msg`).css({top: '-10px', opacity: 0.5})), 70));
        animator.add(new Animation(battle, ( () => $(`.${plot} .msg`).text('')), 40));

        return animator;
    }

    /**
     * Fighter is cured
     * @param cures
     */
    getCured(cures) {
        this.hp += cures;
        this.hp = Math.min(this.hp, this.hpMax());
    }
}
class Fighter {

    /**
     * New Fighter
     * @param game
     */
    constructor (game) {
        this.game = game;
        this.level = 1;
        this.atb = 0;
        this.atbMax = 4000;
        this.hp = this.hpMax();
        this.mp = this.mpMax();
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
        this.fighting = this.game.$timeout( () => {
            if (this.game.mode !== 'fight') return;
            if (this.status === 'running') {
                this.atb += this.delay;
                this.atb = Math.min(this.atb, this.atbMax);
                if (this.atb === this.atbMax) {
                    this.status = 'waiting';
                    this.exec();
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
     * Fighter takes damages
     * @param damages
     */
    getDamaged(damages) {
        this.hp -= damages;
        this.hp = Math.max(this.hp, 0);
        if (this.getLimit) {
            this.getLimit(damages);
        }

        if (this.hp === 0) {
            this.game.battle.testEnd(this.group);
        }
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
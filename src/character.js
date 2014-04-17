class Character {

    /**
     * @param game
     */
    constructor(game) {
        this.game = game;
        this.level = 1;
        this.exp = 0;
        this.expMax = 100;
        this.expTotal = 0;
        this.atb = 0;
        this.atbMax = 4000;
        this.hp = this.hpMax();
        this.mp = this.mpMax();
    }

    /**
     * Returns ATB progress bar width
     * @param width
     * @returns {number}
     */
    atbProgress (width) {
        return Math.ceil((this.atb * width) / this.atbMax);
    }

    /**
     * Returns true if ATB is full
     * @returns {boolean}
     */
    atbFull() {
        return this.atb === this.atbMax;
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
     * Returns random hits
     * @returns {*}
     */
    getHits() {
        var base = this.weapon.hits * this.level;
        var baseMin = Math.ceil((1 - 20/100) * base);
        var baseMax = Math.ceil((1 + 20/100) * base);
        return _.random(baseMin, baseMax);
    }

    /**
     * EXP gains
     * @param exp
     */
    setEXP(exp) {
        this.exp += exp;
        this.expTotal += exp;
        if (this.exp > this.expMax) {
            this.level++;
            this.exp -= this.expMax;
            this.expMax += Math.ceil(10 * this.level/100 * this.expMax);
        }
    }

    /**
     * Returns EXP progress bar width
     * @param width
     * @returns {number}
     */
    expProgress (width) {
        return Math.ceil((this.exp * width) / this.expMax);
    }

    /**
     * Returns EXP remaining to level up
     * @returns {number}
     */
    expRemain() {
        return this.expMax - this.exp;
    }

    /**
     * Equip weapon
     * @param weapon
     */
    equipWeapon (weapon) {
        this.weapon = weapon;
    }

    /**
     * List of character skills
     * @returns {Array}
     */
    skills() {
        var skills = [];
        skills.push({name: 'Attack', fn: this.weapon});
        return skills;
    }

    /**
     * Character begins fighting
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
        this.game.$timeout( () => {
            if (this.game.mode !== 'fight') return;
            if (this.status === 'running') {
                this.atb += this.delay;
                this.atb = Math.min(this.atb, this.atbMax);
                if (this.atb === this.atbMax) {
                    this.status = 'waiting';
                    this.game.battle.commands.add(new Command(this));
                }
            }
            this.keepFighting()
        }, this.delay);
    }

    /**
     * New turn for the character
     */
    newTurn() {
        this.status = 'running';
        this.atb = 0;
    }

}
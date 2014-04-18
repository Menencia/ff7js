class Character extends Fighter {

    /**
     * @param game
     */
    constructor(game) {
        super(game);
        this.exp = 0;
        this.expMax = 100;
        this.expTotal = 0;
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
     * Execute something when atb is full
     * Creating a commands panel awaiting for the player to choose a skill
     */
    exec() {
        this.game.battle.commands.add(new Command(this));
    }

}
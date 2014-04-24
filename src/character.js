class Character extends Fighter {

    /**
     * @param game
     */
    constructor(game) {
        super(game.battle);
        this.game = game;
        this.exp = 0;
        this.expMax = 100;
        this.expTotal = 0;
        this.limit = 0;
    }

    /**
     * Increase limit bar
     * @param damages
     */
    getLimit(damages) {
        this.limit += Math.ceil(damages);
        this.limit = Math.min(this.limit, this.limitMax());

        // search if there's an action awaiting
        if (this.limitFull()) {
            var current = (this.game.battle.commander.current != null) ? [this.game.battle.commander.current]: [];
            var characterCommanders = _.union(this.game.battle.commander.list, current);
            var characterCommander = _.findWhere(characterCommanders, {character: this});
            if (characterCommander) {
                characterCommander.panels[0].commands = this.getCommands();
            }
        }
    }

    /**
     * Returns limit max amount
     * @returns {number}
     */
    limitMax() {
        return Math.ceil(this.hpMax() / 4);
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
     * Returns HP progress bar width
     * @param width
     * @returns {number}
     */
    hpProgress (width) {
        return Math.ceil((this.hp * width) / this.hpMax());
    }

    /**
     * Returns MP progress bar width
     * @param width
     * @returns {number}
     */
    mpProgress (width) {
        return Math.ceil((this.mp * width) / this.mpMax());
    }

    /**
     * Returns HP progress bar width
     * @param width
     * @returns {number}
     */
    limitProgress(width) {
        return Math.ceil((this.limit * width) / this.limitMax());
    }

    /**
     * Returns true if limit is full
     * @returns {boolean}
     */
    limitFull() {
        return this.limit === this.limitMax();
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
     * @param weapon Weapon
     */
    equipWeapon (weapon) {
        this.weapon = weapon;
    }

    /**
     * List of character commands
     * @returns {Array<Command>}
     */
    getCommands(commandsPanel) {
        var commands = [];

        // Weapon or limit
        if (this.limit !== this.limitMax()) {
            commands.push(new AttackCommand(this));
        } else {
            commands.push(new LimitCommandsPanel(this));
        }

        // Items
        //commands.push(new ItemCommandsPanel(this));

        return commands;
    }

    /**
     * Character ready to accept commands
     */
    ready() {
        this.battle.commander.add(
            new CharacterCommander(this, new CommandsPanel(this, this.getCommands()))
        );
    }

    /**
     * @param fn
     */
    execute(fn) {
        if (this.action != null) {
            this.action.execute(fn);
        } else {
            fn();
        }
    }

}
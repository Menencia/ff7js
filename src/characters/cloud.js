class Cloud extends Character {

    /**
     * Add Cloud Strife to the game
     * @param game
     */
    constructor (game) {
        this.name = 'Cloud';
        this.lastname = 'Strife';
        this.image = '/img/characters/cloud.png';
        this.plot = 'cloud';
        this.limitLevel = 1;

        this.level = 1;
        this.hpBase = 140;
        this.mpBase = 50;

        super(game);

        this.weapon = new BusterSword(this);
        this.limits = [new Braver(this)];
    }

}
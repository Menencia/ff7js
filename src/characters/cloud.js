class Cloud extends Character {

    /**
     * Add Cloud Strife to the game
     * @param game
     */
    constructor (game) {
        this.name = 'Cloud Strife';
        this.image = '/img/characters/cloud.png';
        this.plot = 'cloud';
        this.weapon = new BusterSword(game, this);

        this.level = 1;
        this.hpBase = 140;
        this.mpBase = 50;

        super(game);
    }

}
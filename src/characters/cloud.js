class Cloud extends Character {

    constructor (game) {
        this.name = 'Cloud Strife';
        this.image = 'cloud.png';
        this.weapon = new BusterSword(game, this);
        this.hpBase = 140;
        this.mpBase = 50;
        super(game);
    }

}
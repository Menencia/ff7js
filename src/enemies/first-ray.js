class FirstRay extends Enemy {

    constructor(game) {
        this.name = '1st Ray';
        this.image = '/img/enemies/1/1st-ray.png';

        this.level = 1;
        this.hpBase = 50;
        this.mpBase = 0;

        this.strength = 10;
        this.exp = 40;
        this.gil = 30;
        this.ap = 4;

        super(game);
    }

}
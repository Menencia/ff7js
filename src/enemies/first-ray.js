class FirstRay extends Enemy {

    constructor(game) {
        super(game);
        this.name = '1st Ray';
        this.image = '1st-ray.png';
        this.hp = this.hpMax = 50;
        this.exp = 40;
        this.gil = 30;
        this.ap = 4;
    }

}
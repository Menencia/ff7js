class FirstRay extends Enemy {

    /**
     * @param battle
     */
    constructor(battle) {
        this.name = '1st Ray';
        this.image = '/img/enemies/1/1st-ray.png';
        this.plot = 'first-ray';

        this.level = 1;
        this.hpBase = 50;
        this.mpBase = 0;

        this.strength = 10;
        this.exp = 40;
        this.gil = 30;
        this.ap = 4;

        super(battle);

        // battle
        this.count = 0
    }

    /**
     * @param fn
     */
    execute(fn) {
        if (this.count == 0) {
            this.action = this.laserCannon;
            this.count = 1;
        } else {
            this.count = 0;
        }
        super.execute(fn);
    }

    /**
     * @param fn
     */
    laserCannon(fn) {
        var target = _.sample(this.battle.groupB);
        var move = new Mover(this.battle.game.$timeout);
        move.add(new Move( () => {this.battle.message = 'Laser Cannon';}, 0));
        move.add(this.animate());
        move.add(target.getDamaged(10));
        move.add(new Move( () => {this.battle.message = '';}, 0));
        move.run(fn);
    }


}
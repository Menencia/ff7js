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
     * @param targets
     * @param fn
     */
    execute(targets, fn) {
        if (this.count == 0) {
            this.action = this.laserCannon;
            this.count = 1;
        } else {
            this.count = 0;
        }
        super.execute(targets, fn);
    }

    /**
     * @param fn
     */
    laserCannon(fn) {
        var target = _.sample(this.battle.groupB);
        this.animate( () => {

            var animator = new Animator();

            // 1 hit to 1 target
            animator.add(target.getDamagedAnimator(10));

            animator.run(fn);
        });

    }


}
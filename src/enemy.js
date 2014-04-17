class Enemy {

    /**
     * New Enemy
     * @param game
     */
    constructor (game) {
        this.game = game;
    }

    /**
     * @todo
     */
    fight() {}

    /**
     * The enemy takes damages
     * @param damages
     */
    getDamaged (damages) {
        this.hp -= damages;
        this.hp = Math.max(this.hp, 0);
        if (this.hp === 0) {
            this.game.battle.exp += this.exp;
            this.game.battle.gil += this.gil;
            this.game.battle.ap += this.ap;
            this.game.battle.end();
        }
    }

}
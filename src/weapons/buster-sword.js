class BusterSword extends Weapon {

    /**
     * New Buster Sword
     */
    constructor(game, fighter) {
        super(game, fighter);
        this.name = 'Buster Sword';
        this.type = 'broadsword';
        this.hits = 18;
        this.price = 170;
        this.zone = 1;
        this.delay = 5;
    }

}
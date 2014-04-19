class BusterSword extends Weapon {

    /**
     * New Buster Sword
     */
    constructor(character) {
        super(character);
        this.name = 'Buster Sword';
        this.type = 'broadsword';
        this.power = 18;
        this.price = 170;
        this.zone = 1;
        this.delay = 5;
    }

}
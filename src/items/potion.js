class Potion extends Item {

    constructor(game) {
        super(game);
        this.name = 'Potion';
    }

    use() {
        this.character.hp += 150;
    }

}
class Potion extends Item {

    constructor(game) {
        super(game);
        this.name = 'Potion';
    }

    use() {
        return 150;
    }

}
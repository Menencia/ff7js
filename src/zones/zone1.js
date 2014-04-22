class Zone1 extends Zone {

    /**
     * New Zone 1
     * @param game
     */
    constructor(game) {
        super(game, 'Sector 1 Reactor');
    }

    /**
     * Enemy configuration
     * @returns {*[]}
     */
    opponents() {
        return [
            [new FirstRay(this.game.battle)]
        ];
    }

}


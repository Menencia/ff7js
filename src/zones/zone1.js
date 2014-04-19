class Zone1 extends Zone {

    /**
     * New Zone 1
     * @param game
     */
    constructor(game) {
        this.game = game;
        this.name = 'Sector 1 Reactor'
    }

    /**
     * Enemy configuration
     * @returns {*[]}
     */
    opponents() {
        return [
            [new FirstRay(this.game)]
        ];
    }

}


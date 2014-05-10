class Save {

    /**
     * @param data
     */
    constructor(game, data) {
        this.game = game;

        // characters
        this.characters = data.characters;

        // zone
        this.zone = data.zone;

        // globals
        this.time = data.time;
        this.gil = data.gil;
    }

    /**
     * @param characters
     */
    set characters(characters) {
        this._characters = [];
        for (var c of characters) {
            var character = new window[c.model](this.game);
            character.extend(c);
            this._characters.push(character);
        }
    }

    /**
     * @returns {*}
     */
    get characters() {
        return this._characters;
    }

    /**
     * @param data
     */
    set zone(data) {
        this._zone = new window[data](this.game);
    }

    /**
     * @returns {*}
     */
    get zone() {
        return this._zone;
    }

}
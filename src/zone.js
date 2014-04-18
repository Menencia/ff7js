class Zone {

    /**
     * Returns true if fighting is possible
     * @returns {boolean}
     */
    canExplore() {
        return (this.game.mode === 'home');
    }

    /**
     * Launch a battle with a random configuration
     */
    explore() {
        if (!this.canExplore()) return;
        var opponents = _.sample(this.opponents(), 1)[0];
        this.game.battle = new Battle(this.game, opponents, this.game.getTeam());
    }
}
class Commander {

    /**
     * Commands panels management
     * @param battle
     */
    constructor (battle) {
        this.battle = battle;
        this.list = [];
        this.current = null;
        this.subcurrent = null;
        this.isActive = false;
    }

    /**
     * New commandsPanel into the list
     * @param commandsPanel
     */
    add (commandsPanel) {
        this.list.push(commandsPanel);
        if (this.current == null) {
            this.display();
        }
    }

    /**
     * Display the first commandsPanel of the list
     * @param i
     */
    display (i = 0) {
        if (this.list.length > 0) {
            this.current = this.list[i];
        }
    }

    /**
     * Close the current shown commandsPanel
     */
    close() {
        var index = _.indexOf(this.list, this.current);
        this.list.splice(index, 1);
        this.current = null;
        this.subcurrent = null;
        this.display();
    }

}
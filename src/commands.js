class Commands {

    /**
     * New Commands
     * @param battle
     */
    constructor (battle) {
        this.battle = battle;
        this.list = [];
        this.current = null;
        this.isActive = false;
    }

    /**
     * New command into the list
     * @param command
     */
    add (command) {
        this.list.push(command);
        this.display();
    }

    /**
     * Display the first command of the list
     * @param i
     */
    display (i = 0) {
        if (this.list.length > 0) {
            this.current = this.list[i];
        }
    }

    /**
     * Close the current shown command
     */
    close() {
        var index = _.indexOf(this.list, this.current);
        this.list.splice(index, 1);
        this.current = null;
        this.display();
    }

}
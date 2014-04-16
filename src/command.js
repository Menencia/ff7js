class Command {

    /**
     * New Command
     * @param fighter
     */
    constructor(fighter) {
        this.fighter = fighter;
        this.skills = this.fighter.skills();
    }

}

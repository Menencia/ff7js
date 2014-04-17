class Game {

    /**
     * New Game
     * @param $rootScope
     * @param $location
     * @param $cookieStore
     * @param $http
     * @param $timeout
     */
    constructor ($rootScope, $location, $cookieStore, $http, $timeout) {
        this.$rootScope = $rootScope;
        this.$location = $location;
        this.$cookieStore = $cookieStore;
        this.$http = $http;
        this.$timeout = $timeout;

        this._id = _.uniqueId();
        this.mode = 'home';
        this.gil = 200

        this.characters = [];
        this.items = [];

        this.$rootScope.game = this;

        this.version = '0.1.1';

        // time
        this.time = 0;
        this.run();
    }

    /**
     * Load new/saved game
     */
    load() {
        if (!this.loaded) {
            this.loaded = true;
            var save = this.$cookieStore.get('game');
            if (save) {
                this.extend(save);
            } else {
                this.newGame();
            }
        }
    }

    /**
     * Create new game
     */
    newGame() {
        var cloud = new Cloud(this);

        this
            .addCharacter(cloud)
            .addItem(new Potion())
            .addItem(new Potion());

        this.zone = new Zone1(this);
    }

    /**
     * Go to a screen
     * @param mode
     */
    setMode (mode) {
        this.mode = mode;
        this.$location.path('/' + mode);
    }

    /**
     * Add a character
     * @param character
     * @returns {Game}
     */
    addCharacter (character) {
        this.characters.push(character);
        return this;
    }

    /**
     * Add an item
     * @param item
     * @returns {Game}
     */
    addItem (item) {
        this.items.push(item);
        return this;
    }

    /**
     * Add Gil
     * @param gil
     */
    setGil (gil) {
        this.gil += gil;
    }

    /**
     * Get the 3 first characters
     * @returns {*}
     */
    getTeam() {
       return _.first(this.characters, 3);
    }

    /**
     * Run the chrono
     */
    run() {
        this.$timeout( () => {
            this.time++;
            this.run();
        }, 1000);
    }

    /**
     * Return the time spent on the game since the beginning
     */
    getTime() {
        var elapsed = this.time;
        var hours = Math.floor(elapsed / 3600);
        elapsed -= hours * 3600;

        var minutes = Math.floor(elapsed / 60);
        if (minutes < 10) {
            minutes = '0' + minutes;
        }

        var seconds = elapsed - minutes * 60;
        if (seconds < 10) {
            seconds = '0' + seconds;
        }

        return hours + ':' + minutes + ':' + seconds;
    }

    /**
     * Get rewards & redirect to home
     */
    getRewards() {
        this.setMode('home');
    }

}
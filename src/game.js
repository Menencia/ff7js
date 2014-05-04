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
        this.gil = 200;

        this.characters = [];
        this.items = [];

        this.$rootScope.game = this;

        this.version = '0.1.2';

        // loading saves
        this.saves = [];
        for (var i = 1; i <= 3; i++) {
            var s = localStorage['save' + i];
            var save = (s) ? new Save(this, JSON.parse(s)): {empty: true};
            this.saves.push(save);
        }
        this.currentSave = 0;
        this.currentLoad = 0;

        // time
        this.time = 0;
        this.run();
    }

    /**
     * Create new game
     */
    newGame() {
        var cloud = new Cloud(this);

        this
            .addCharacter(cloud)
            .addItem(new Potion(this))
            .addItem(new Potion(this));

        this.zone = new Zone1(this);

        this.loaded = true;

        new Sound('/sounds/ff7ok.wav', () => {
            this.setMode('home');
        });

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

    /**
     * Go to load screen
     */
    goLoadScreen() {
        this.setMode('load');
    }

    /**
     * Go to save screen
     */
    goSave() {
        this.setMode('save');
    }

    /**
     *
     */
    chooseSave(num) {
        this.currentSave = num;
    }

    /**
     *
     */
    chooseLoad(num) {
        this.currentLoad = num;
    }

    /**
     * @param confirm
     */
    save(confirm) {
        if (!confirm) {
            this.currentSave = 0;
            return;
        }

        var s = this.export();
        localStorage['save' + this.currentSave] = JSON.stringify(s);
        this.saves[this.currentSave - 1] = s;

        this.currentSave = 0;
    }

    /**
     * @param confirm
     */
    load(confirm) {
        if (!confirm) {
            this.currentLoad = 0;
            return;
        }

        var save = this.saves[this.currentLoad - 1];
        for (var c of save.characters) {
            this.characters.push(c);
        }
        this.time = save.time;
        this.gil = save.gil;

        this.loaded = true;
        this.currentLoad = 0;

        this.setMode('home');
    }

    /**
     * @returns {*}
     */
    getSaves() {
        return this.saves;
    }

    /**
     * @returns {{characters: Array, gils: *, time: (*|time)}}
     */
    export() {
        var characters = [];
        for (var c of this.characters) {
            characters.push(c.export());
        }

        return {
            characters: characters,
            gil: this.gil,
            time: this.time
        };
    }

}
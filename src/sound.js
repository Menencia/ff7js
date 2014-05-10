class Sound {

    /**
     * Plays sound and executes callback at the end
     * @param path
     * @param fn
     */
    constructor(path, fn) {
        var params = {};

        params.urls = [path];

        if (fn) {
            params.onend = fn;
        }

        new Howl(params).play();
    }

}
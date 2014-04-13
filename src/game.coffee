# Main class of the game
#
class Game

  # New Game
  #
  # @param [Object] $rootScope     Use it fo data-binding
  # @param [Object] $location      Use it to navigate between pages
  # @param [Object] $cookieStore   Use it to save/load the game
  # @param [Object] $http          Use it to load resources
  # @param [Object] $timeout       Use it to replace setTimeout()
  #
  constructor: (@$rootScope, @$location, @$cookieStore, @$http, @$timeout) ->
    @_id = _.uniqueId()
    @mode = 'home'
    @gils = 200

    @characters = []
    @items = []

    @$rootScope.game = @

    # time
    @time = 0
    @run()

  # Load new/saved game
  #
  load: ->
    if (!@loaded)
      @loaded = true
      save = @$cookieStore.get 'game'
      if save
        @extend(save)
      else
        @newGame()

  # New game
  #
  newGame: ->
    cloud = new Cloud(@)

    @
    .addCharacter(cloud)
    .addItem(new Potion())
    .addItem(new Potion())

    @zone = new Zone1(@)

  # Go to a screen
  #
  # @param [String] mode  Name of the page to redirect to
  #
  setMode: (@mode) ->
    @$location.path("/#{@mode}")

  # Add a character
  #
  # @param [Character] character Character to add to the game
  # @return [Game]
  #
  addCharacter: (character) ->
    @characters.push(character)
    @

  # Add an item
  #
  # @param [Item] item  Item to add the the inventory
  # @return [Game]
  #
  addItem: (item) ->
    @items.push(item)
    @

  # Get the 3 first characters
  #
  # @return [Array<Character>]
  #
  getTeam: ->
    _.first(@characters, 3)

  # Run the time
  #
  run: ->
    @$timeout(=>
      @time++
      @run()
    , 1000)

  # Return the time spent on the game since the beginning
  #
  # @return [String]
  #
  getTime: ->
    elapsed = @time
    hours = Math.floor(elapsed / 3600)
    elapsed -= hours * 3600
    minutes = Math.floor(elapsed / 60)
    minutes = '0' + minutes if minutes < 10
    seconds = elapsed - minutes * 60
    seconds = '0' + seconds if seconds < 10
    hours + ':' + minutes + ':' + seconds

  # Get rewards & redirect to home
  #
  getRewards: ->
    @setMode('home')
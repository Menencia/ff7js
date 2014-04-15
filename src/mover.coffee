class Mover

  # @property [Object]
  $timeout: null

  # @property [Array<Move>]
  moves: []

  # @property [Function]
  fn: null

  # New instance
  #
  constructor: (@$timeout, @moves, @fn) ->
    @run()

  # Run the mover
  #
  run: ->
    if @moves.length == 0
      @fn()
    else
      move = @moves.shift()
      @$timeout(=>
        move.fn()
        @run()
      , move.ms)

class Enemy

  constructor: (@Game) ->

  fight: ->
    # nothing yet

  # The enemy takes damages
  #
  # @param [Integer]
  #
  getDamaged: (damages) ->
    @hp -= damages
    @hp = Math.max(@hp, 0)

    if @hp is 0
      @Game.battle.exp += @exp
      @Game.battle.gil += @gil
      @Game.battle.ap += @ap
      @Game.battle.end()
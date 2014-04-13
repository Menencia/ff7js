class Battle

  # @property [Commands]
  commands: null

  # @property [Array<Action>]
  actions: []

  # New battle
  #
  constructor: (@Game, @opponents) ->
    @commands = new Commands(@)
    @Game.setMode('fight')
    for opponent in @opponents
      opponent.fight()
    for character in @Game.getTeam()
      character.fight()
    @run()

  # Checks and executes actions
  run: ->
    @Game.$timeout(=>
      if @actions.length > 0
        @actions[0].exec()
        @actions.splice(0, 1)
      @run()
    , 1000)

  # End of the battle
  #
  end: ->
    remaining = _.filter(@opponents, (enemy) -> enemy.hp > 0).length
    if remaining is 0
      @opponents = []
      @Game.setMode('rewards')
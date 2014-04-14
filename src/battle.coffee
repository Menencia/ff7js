class Battle

  # @property [Commands] List of panel commands awaiting
  commands: null

  # @property [Array<Action>] List of all actions to execute
  actions: []

  # @property [Action] Current action ongoing
  action: null

  # @property [Integer] EXP reward
  exp: 0

  # @property [Integer] Gil reward
  gil: 0

  # @property [Integer] AP reward
  ap: 0

  # New instance
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
        @action = @actions.shift()
        @action.exec(=>
          @action.fighter.newTurn()
          @action = null
        )
      @run()
    , 1000)

  # End of the battle
  #
  end: ->
    remaining = _.filter(@opponents, (enemy) -> enemy.hp > 0).length
    if remaining is 0
      @opponents = []
      @Game.setMode('rewards')
      for character in @Game.getTeam()
        character.setEXP(@gil)
        @Game.setGil(@gil)
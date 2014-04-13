class Weapon

  constructor: (@Game) ->

  # Deals damages
  use: ->
    if @Game.mode isnt 'fight' then return

    # close command window
    @Game
      .battle
      .commands
      .close()

    # register action
    action = new Action(@Game.battle)
    action.target('random')
    action.damages(@hits)
    @Game.battle.actions.push(action)

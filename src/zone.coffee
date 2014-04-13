class Zone

  canExplore: ->
    @Game.mode is 'home'

  explore: ->
    if not(@canExplore()) then return
    opponents = _.sample(@opponents(), 1)[0]
    battle = new Battle(@Game, opponents)
    @Game.battle = battle
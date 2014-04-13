class Zone1 extends Zone

  constructor: (@Game) ->
    @name = 'Sector 1 Reactor'

  opponents: ->
    [
      [new FirstRay(@Game)]
    ]


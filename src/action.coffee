class Action

  # @property [Character, Enemy] The one who execute the action
  fighter: null

  # @property [Array<Character, Enemy>] The ones targeted by the actions
  targets: []

  # @property [Integer] Base hits of the action
  hits: 0

  # @property [String] The plot of the fighter
  plot: '.plot'

  # New instance
  #
  constructor: (@battle, @fighter) ->

  # Get a target
  #
  # @param [String] Type of the target
  #
  target: (key) ->
    switch (key)
      when 'random'
        @targets = [_.sample(@battle.opponents)]

  # Set damages done by the action
  #
  # @param [Integer]
  #
  damages: (@hits) ->

  # Execute an action
  # An action is composed by moves
  #
  # @param [Function] Executes once the action is done
  #
  exec: (fn) ->
    moves = []
    moves.push(new Move((=> $(@plot).attr('src', '/img/sprites/cloud2.png')), 100))
    moves.push(new Move((=> $(@plot).attr('src', '/img/sprites/cloud1.png')), 100))
    moves.push(new Move((=> $(@plot).attr('src', '/img/sprites/cloud2.png')), 50))
    moves.push(new Move((=> $(@plot).attr('src', '/img/sprites/cloud3.png')), 50))
    moves.push(new Move((=> $(@plot).attr('src', '/img/sprites/cloud4.png')), 50))
    moves.push(new Move((=> $(@plot).attr('src', '/img/sprites/cloud3.png')), 100))

    new Mover(@battle.Game.$timeout, moves, =>
      for target in @targets
        target.getDamaged(@hits)
      fn()
    )
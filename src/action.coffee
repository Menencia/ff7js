class Action

  # @property [Array<Character, Enemy>]
  targets: []

  # @property [Integer]
  hits: 0

  # New action
  constructor: (@battle) ->

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
  #
  exec: ->
    for target in @targets
      target.getDamaged(@hits)
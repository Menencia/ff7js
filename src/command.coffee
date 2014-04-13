class Command

  # @property [Character, Enemy]
  fighter: null

  # @property [Array] Skills list
  skills: []

  # New command
  #
  # @param [Character, Enemy] fighter
  #
  constructor: (@fighter) ->
    @skills = @fighter.skills()
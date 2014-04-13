class Commands

  # @property [Array] Ordered commands list
  # @note The first is the next to display
  list: []

  # @property [Command, null] Active command
  current: null

  # New commands
  #
  # @param [Battle] battle
  #
  constructor: (@battle) ->

  # New command into the list
  #
  # @param [Command] command
  #
  add: (command) ->
    @list.push(command)
    @display()

  # Display the first command of the list
  #
  # @param [Int] i
  #
  display: (i = 0) ->
    if @list.length > 0
      @current = @list[i]

  # Close the current shown command
  #
  close: ->
    index = _.indexOf(@list, @current)
    @current.fighter.newTurn()
    @current = null
    @list.splice(index, 1)
    @display()
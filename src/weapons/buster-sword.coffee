class BusterSword extends Weapon

  constructor: (Game, fighter) ->
    super(Game, fighter)
    @name = 'Buster Sword'
    @type = 'broadsword'
    @hits = 18
    @price = 170
    @zone = 1
    @delay = 5
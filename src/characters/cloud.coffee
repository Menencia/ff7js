class Cloud extends Character

  constructor: (Game) ->
    @name = 'Cloud Strife'
    @image = 'cloud.png'
    @weapon = new BusterSword(Game, @)
    @hpBase = 140
    @mpBase = 50
    super(Game)
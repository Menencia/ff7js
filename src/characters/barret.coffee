class Barret extends Character

  constructor: ->
    super()
    @name = 'Barret Wallace'
    @image = 'barret.png'
    @weapon = new GatlingGun()
    @hpBase = 16
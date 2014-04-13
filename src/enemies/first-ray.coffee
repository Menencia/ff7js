class FirstRay extends Enemy

  constructor: (Game) ->
    super(Game)
    @name = '1st Ray'
    @image = '1st-ray.png'
    @hp = @hpMax = 50
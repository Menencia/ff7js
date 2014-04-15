class Character

  constructor: (@Game) ->
    @level ?= 1
    @exp ?= 0
    @expMax ?= 100
    @expTotal ?= 0
    @atb ?= 0
    @atbMax ?= 4000
    @hp ?= @hpMax()
    @mp ?= @mpMax()

  atbProgress: (width) ->
    Math.ceil((@atb * width) / @atbMax)

  atbFull: () ->
    @atb is @atbMax

  hpMax: ->
    @hpBase * @level

  mpMax: ->
    @mpBase * @level

  getHits: ->
    base = @weapon.hits * @level
    baseMin = Math.ceil((1 - 20/100) * base)
    baseMax = Math.ceil((1 + 20/100) * base)
    _.random(baseMin, baseMax)

  setEXP: (exp) ->
    @exp += exp
    @expTotal += exp
    if @exp > @expMax
      @level++
      @exp -= @expMax
      @expMax += Math.ceil(10 * @level/100 * @expMax)

  expProgress: (width) ->
    Math.ceil((@exp * width) / @expMax)

  expRemain: ->
    @expMax - @exp

  equipWeapon: (weapon) ->
    @weapon = weapon

  materias: ->
    @materias

  items: ->
    @items

  skills: ->
    skills = []
    skills.push({name: 'Attack', fn: @weapon})
    skills

  fight: ->
    @delay = 100
    @status = 'running'
    @keepFighting()

  keepFighting: ->
    @Game.$timeout(=>
      if @Game.mode isnt 'fight' then return
      if @status is 'running'
        @atb += @delay
        @atb = Math.min(@atb, @atbMax)
        if @atb is @atbMax
          @status = 'waiting'
          @Game.battle.commands.add(new Command(@))

      @keepFighting()
    , @delay)

  newTurn: ->
    @status = 'running'
    @atb = 0
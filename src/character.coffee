class Character

  constructor: (@Game) ->
    @level ?= 1
    @exp ?= 0
    @expMax ?= 100
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
    @weapon.hits * @level * 0.1

  setEXP: (exp) ->
    @exp += exp

  expProgress: (width) ->
    Math.ceil((@exp * width) / @expMax)

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
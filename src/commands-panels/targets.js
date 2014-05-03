class TargetsCommandsPanel extends CommandsPanel {

    constructor(model, character) {
        var commands = model.getTargetCommands(character);
        super(character, commands);
    }

}
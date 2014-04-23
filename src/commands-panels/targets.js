class TargetsCommandsPanel extends CommandsPanel {

    constructor(model) {
        var character = model.character;
        var commands = model.getTargetCommands();
        super(character, commands);
    }

}
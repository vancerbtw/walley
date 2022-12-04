import { ClientEvents, Events } from "discord.js";
import { CommandManager } from "../managers/CommandManager";
import { GuildManager } from "src/managers/GuildManager";
import { Bot } from "src/services/Bot";
import { BaseEvent } from "src/base/BaseEvent";
import { injectable } from "tsyringe";

@injectable()
export default class OnInteractionCreate implements BaseEvent {
  eventName = Events.InteractionCreate;

  constructor(private commandManager: CommandManager) {}

  listener: (bot: Bot, ...args: ClientEvents[Events.InteractionCreate]) => void = (bot, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    this.commandManager.handleCommand(interaction)
  };
}

import path from "path";
import { BaseCommand } from "src/base/BaseCommand";
import { container, delay, inject, injectable, singleton } from "tsyringe";
import fs from "fs";
import { ChatInputCommandInteraction, Collection, Interaction, Message, Routes, SlashCommandBuilder } from "discord.js";
import { GuildManager } from "./GuildManager";
import { Bot } from "../services/Bot";

@singleton()
export class CommandManager {
  commands: Collection<string, BaseCommand> = new Collection();

  constructor(private guildManager: GuildManager, @inject(delay(() => Bot)) private bot: Bot) {}

  async init() {
    const commandFiles = await fs.promises.readdir(path.join(__dirname, "../commands"));

    for (const fileName of commandFiles) {
      //lets import the event
      const commandFile = (await import(path.join(__dirname, "../commands/", fileName))).default;

      const command: BaseCommand = container.resolve(commandFile);

      console.log(fileName);

      this.commands.set(command.data.name, command);
    }
  }

  async registerCommands() {
    const commands = Array.from(this.commands.entries()).map(([_, cmd]) => cmd.data);

    await this.bot.restClient.put(
      Routes.applicationCommands(this.bot.clientId),
      { body: commands },
    );
  }

  async handleCommand(interaction: ChatInputCommandInteraction) {
    if (!interaction.inGuild()) return;

    const guild = await this.guildManager.getGuild(interaction.guildId);

    const command = this.commands.get(interaction.commandName);

    if (!command) {
      return interaction.reply("Not a command");
    }
    
    command.execute(interaction, guild);
  }
}
import { Guild } from "@prisma/client";
import { Bot } from "src/services/Bot";
import { SlashCommandStringOption, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export class BaseCommand {
  data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
  execute: (interaction: ChatInputCommandInteraction, guild: Guild, ...args: string[]) => void
}
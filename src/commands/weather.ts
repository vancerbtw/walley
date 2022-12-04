import { Guild } from "@prisma/client";
import { ChatInputCommandInteraction, EmbedBuilder, Interaction, SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ComponentType, ButtonStyle } from "discord.js";
import { Bot } from "src/services/Bot";
import { BaseCommand } from "src/base/BaseCommand";
import { injectable } from "tsyringe";

@injectable()
export default class Weather implements BaseCommand {
  data = new SlashCommandBuilder()
    .setName('weather')
    .setDescription("Fetch the weather!")
    .addStringOption(
      (builder) => {
        return builder.setName('category')
          .setDescription('The gif category')
          .setRequired(true)
          .addChoices(
            { name: 'Funny', value: 'gif_funny' },
            { name: 'Meme', value: 'gif_meme' },
            { name: 'Movie', value: 'gif_movie' },
          );
      }
    );

  loadingEmbed = () => {
    return new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle("Loading Weather...")
  }

  generateWeatherEmbed = () => {
    const embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('Some title')
      .setURL('https://discord.js.org/')
      .setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
      .setDescription('Some description here')
      .setThumbnail('https://i.imgur.com/AfFp7pu.png')
      .addFields(
        { name: 'Regular field title', value: 'Some value here' },
        { name: '\u200B', value: '\u200B' },
        { name: 'Inline field title', value: 'Some value here', inline: true },
        { name: 'Inline field title', value: 'Some value here', inline: true },
      )
      .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
      .setImage('https://i.imgur.com/AfFp7pu.png')
      .setTimestamp()
      .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

    return embed;
  }
  
  execute = async (interaction: ChatInputCommandInteraction, guild: Guild, ...args: string[]) => {
    if (!interaction.channel) return;

    const embed = this.loadingEmbed();

    await interaction.reply({ embeds: [embed] });
    const reply = await interaction.fetchReply();

    setTimeout(async () => {
      const weatherEmbed = this.generateWeatherEmbed();

      reply.edit({
        embeds: [ weatherEmbed ]
      })
    }, 4000);
  }
}
import { ClientEvents, ClientUser, Events } from "discord.js";
import { Database } from "../services/Database";
import { BaseEvent } from "src/base/BaseEvent";
import { injectable, container, inject } from "tsyringe";
import { Bot } from "src/services/Bot";
import { GuildManager } from "../managers/GuildManager";

@injectable()
export default class OnJoin implements BaseEvent {
  constructor(private guildManager: GuildManager) {}

  eventName = Events.GuildCreate;
  listener: (bot: Bot, ...args: ClientEvents[Events.GuildCreate]) => void = async (bot, guild) => {
    let logs = await guild.fetchAuditLogs();
    //searching audit logs to get the discord id of the user who invited our bot
    const invitingUserResult = logs.entries.filter(e => e.action === 28).find(e => (e.target as ClientUser).id === bot.client.user?.id)?.executor;

    if (!invitingUserResult) return;

    const invitingUser = bot.client.users.resolve(invitingUserResult);
    
    await this.guildManager.createGuild(guild.id, invitingUser.id);

    invitingUser.send(`Hey it looks like you have invited Walley to: ${guild.name}.`);
  }
}

import { ClientEvents, ClientUser, Events } from "discord.js";
import { Database } from "../services/Database";
import { BaseEvent } from "src/types/BaseEvent";
import { injectable, container, inject } from "tsyringe";
import { Bot } from "src/services/Bot";

@injectable()
export default class OnJoin implements BaseEvent {
  constructor(private database: Database) {}

  eventName = Events.GuildCreate;
  listener: (bot: Bot, ...args: ClientEvents[Events.GuildCreate]) => void = async (bot, guild) => {
    let logs = await guild.fetchAuditLogs();
    //searching audit logs to get the discord id of the user who invited our bot
    const invitingUser = logs.entries.filter(e => e.action === 28).find(e => (e.target as ClientUser).id === bot.client.user?.id)?.executor;

    if (!invitingUser) return;

    const resolved = bot.client.users.resolve(invitingUser);
    
    resolved.send("hey i just joined ur guild!")
    //   let user = logs?.executor
    // let user = logs.find(l => l.target?.id === client.user.id)?.executor
  }
}

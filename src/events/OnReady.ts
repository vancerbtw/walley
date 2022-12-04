import { ClientEvents, Events } from "discord.js";
import { Database } from "../services/Database";
import { BaseEvent } from "src/base/BaseEvent";
import { injectable, container, inject } from "tsyringe";
import { Bot } from "src/services/Bot";

@injectable()
export default class OnReady implements BaseEvent {
  constructor(private database: Database) {}

  eventName = Events.ClientReady;
  listener: (bot: Bot, ...args: ClientEvents[Events.ClientReady]) => void = (bot, client) => {
    console.log("Bot is ready!");
  }
}

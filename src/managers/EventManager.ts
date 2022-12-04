import fs from "fs";
import path from "path";
import { BaseEvent } from "src/base/BaseEvent";
import { injectable, container, singleton } from "tsyringe";
import { Bot } from "../services/Bot";

@singleton()
export class EventManager {
  async init(bot: Bot) {
    const events = await fs.promises.readdir(path.join(__dirname, "../events"));

    for (const file of events) {
      //lets import the event
      const event = (await import(path.join(__dirname, "../events/", file))).default;

      const { eventName, listener }: BaseEvent = container.resolve(event);

      bot.client.on(eventName, (...args) => {
        listener(bot, ...args);
      });
    }
  }
}
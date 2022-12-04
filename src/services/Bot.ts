import { Client, Events, GatewayIntentBits } from "discord.js";
import { injectable } from "tsyringe";
import { EventManager } from "./EventManager";

@injectable()
export class Bot {
  public client = new Client({ intents: [GatewayIntentBits.Guilds] });

  constructor(private eventManager: EventManager) {
    this.init();
  }

  init() {
    this.eventManager.loadEvents(this);
  }

  login() {
    this.client.login(process.env.BOT_TOKEN);
  }
}

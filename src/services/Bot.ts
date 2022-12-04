import { Client, Events, GatewayIntentBits, REST } from "discord.js";
import { injectable, singleton } from "tsyringe";
import { CommandManager } from "../managers/CommandManager";
import { EventManager } from "../managers/EventManager";

@singleton()
export class Bot {
  public client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
  public restClient = new REST({ version: '10' });

  public clientId: string = process.env.CLIENT_ID!;

  constructor(private eventManager: EventManager, private commandManager: CommandManager) {}

  async init() {
    await this.eventManager.init(this);
    await this.commandManager.init();
    
    this.restClient.setToken(process.env.BOT_TOKEN!);
    await this.commandManager.registerCommands();
  }

  login() {
    this.client.login(process.env.BOT_TOKEN!);
  }
}

import 'reflect-metadata';
import { Client, Events, GatewayIntentBits } from "discord.js";
import * as dotenv from 'dotenv';
import { Bot } from "./services/Bot";
import { container } from "tsyringe";

dotenv.config();

//loading depend injection manager

(async () => {
  console.log("Starting Walley with a chance of rain ⛈");

  const bot = container.resolve(Bot);
  
  await bot.init();
  
  bot.login();
})()
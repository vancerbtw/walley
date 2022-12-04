import { Events } from "discord.js";

export interface BaseEvent {
  eventName: typeof K;

  listener: (...args: ClientEvents[any]) => void;
}
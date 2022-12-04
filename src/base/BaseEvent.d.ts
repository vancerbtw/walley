import { Events } from "discord.js";

export class BaseEvent {
  eventName: typeof K;

  abstract listener: (...args: ClientEvents[any]) => void;
}
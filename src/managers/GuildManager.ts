import { Guild } from "@prisma/client";
import { Database } from "../services/Database";
import { singleton } from "tsyringe";

@singleton()
export class GuildManager {
  cache: Map<string, Guild> = new Map();

  constructor(private database: Database) {}
  
  async getGuild(guildId: string): Promise<Guild> {
    const cachedGuild = this.cache.get(guildId);

    if (cachedGuild) return cachedGuild;

    const databaseGuild = await this.database.guild.findFirst({
      where: {
        guildId
      }
    });

    if (!databaseGuild) throw "Guild not in database";

    this.cache.set(databaseGuild.guildId, databaseGuild);

    return databaseGuild;
  }

  async createGuild(guildId: string, inviteUserId: string): Promise<Guild> {
    const guild = await this.database.guild.upsert({
      where: {
        guildId
      },
      update: {},
      create: {
        guildId,
        inviteUserId
      }
    });

    this.cache.set(guild.guildId, guild);

    return guild;
  }
}
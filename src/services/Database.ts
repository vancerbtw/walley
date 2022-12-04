import { injectable, singleton } from "tsyringe";
import { PrismaClient } from "@prisma/client";

// @injectable()
// export class Database extends PrismaClient {
  
// }

@singleton()
export class Database extends PrismaClient {
  constructor() {
    super();
  }
}
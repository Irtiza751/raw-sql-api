import { Module } from "@decorators/server";
import { HttpModule } from "@decorators/server/http";
import { ExpressAdapter } from "@decorators/server/express";
import { AppController } from "./app.controller";

@Module({
  modules: [HttpModule.create(ExpressAdapter)],
  controllers: [AppController],
})
export class AppModule {}

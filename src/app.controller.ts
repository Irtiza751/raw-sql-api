import { Controller } from "@decorators/server";
import { Get } from "@decorators/server/http";

@Controller("/")
export class AppController {
  @Get("/hello")
  hello() {
    return "Hello, world";
  }
}

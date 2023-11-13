import { ZodError } from "zod";
import { JwtService } from "./JwtService";
import { JwtPayload } from "jsonwebtoken";
import { TokenRepo } from "../repos/TokenRepo";

export class UtilityService {
  static parseZodError(errorObj: ZodError) {
    const issues = errorObj.issues.map(err => err.message);
    // console.log("zod error", issues);
    return { issues }
  }

  static async autoLogin(token: string) {
    const payload = JwtService.decode(token) as JwtPayload;
    console.log("decoded payload: ", payload);

    try {
      const { refresh_token } = await TokenRepo.find(payload.id);

      const isValid = JwtService.varify(refresh_token, 'refresh');
      if (isValid) {
        const newToken = JwtService.sign({ id: payload.id }, 'normal');
        const newRefreshToken = JwtService.sign({ id: payload.id }, 'refresh');
        await TokenRepo.update({
          user_id: payload.id,
          token: newToken,
          refresh_token: newRefreshToken
        });
        return payload;
      }
    } catch (error) {
      // console.log("util errror: ", error);

      throw error;
    }
  }
}

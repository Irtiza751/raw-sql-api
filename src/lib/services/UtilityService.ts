import { ZodError } from "zod";

export class UtilityService {
  static parseZodError(errorObj: ZodError) {
    const issues = errorObj.issues.map(err => err.message);
    // console.log("zod error", issues);
    return { issues }
  }
}

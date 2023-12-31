import { NextFunction, Request, Response } from "express";
import { JwtService } from "../lib/services/JwtService";
import { UtilityService } from "../lib/services/UtilityService";

export class AuthMiddleware {
  static auth(req: Request, res: Response, next: NextFunction) {
    let token: string;
    // req.headers.authorization?.split
    if (req.headers.authorization) {
      token = req.headers.authorization.split(' ')[1];
    } else {
      return res.status(400).json({ msg: 'unauthenticated' });
    }

    try {
      const payload = JwtService.varify(token, 'normal');
      if (payload) {
        req.user = payload;
      }
    } catch (error) {
      UtilityService.autoLogin(token)
        .then(payload => {
          if (payload) {
            req.user = payload;
          }

          return next();
        })
        .catch(err => {
          // console.log('auth refresh err: ', err);
          return res.status(401).json({ msg: 'Unauthenticated' })
        })
      return;
    }

    return next();
  }
}
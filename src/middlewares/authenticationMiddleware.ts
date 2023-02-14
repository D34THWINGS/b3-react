import {NextFunction, Request, Response} from "express";

export function authenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.signedCookies.ssid) {
    res.redirect('/login')
    return
  }
  next()
}

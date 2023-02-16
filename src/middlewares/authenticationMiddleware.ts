import {NextFunction, Request, Response} from "express";

export function authenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.signedCookies.ssid) {
    res.status(401).send({message: 'Unauthorized'})
    return
  }
  next()
}

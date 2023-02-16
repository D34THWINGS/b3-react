import {Application} from "express";

export function postLogout(app: Application) {
  app.post(
    '/api/v1/logout',
    (req, res) => {
      res.clearCookie('ssid');
      res.send({ success: true });
    }
  )
}

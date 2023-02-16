import {Application} from "express-ws";
import bodyParser from "body-parser";
import {createUser} from "../repositories/userRepository";

export function postRegister(app: Application) {
  app.post(
    '/api/register',
    bodyParser.urlencoded(),
    async (req, res) => {
      const {email, name} = req.body;
      if (!email || !name) {
        res.status(400).send('Bad Request')
        return
      }
      const user = await createUser(email, name);
      if (!user) {
        res.status(400).send('Email already used')
        return
      }
      res.cookie(
        'ssid',
        user.id,
        { signed: true, httpOnly: true, sameSite: true }
      );
      res.send({ success: true });
    }
  )
}

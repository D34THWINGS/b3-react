import {Application} from "express-ws";
import bodyParser from "body-parser";
import {findUserByEmail} from "../repositories/userRepository";

export function postLogin(app: Application) {
  app.post(
    '/login',
    bodyParser.urlencoded(),
    async (req, res) => {
      try {
        const email = req.body.email;
        const user = await findUserByEmail(email)
        if (!user) {
          res.status(401).send('Invalid email');
          return;
        }
        res.cookie(
          'ssid',
          user.id,
          {signed: true, httpOnly: true, sameSite: true}
        );
        res.redirect('/')
      } catch (e) {
        console.error(e)
        res.status(500).send('Internal Server Error')
      }
    }
  )
}

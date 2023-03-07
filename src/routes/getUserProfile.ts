import { Application } from 'express-ws'
import { findUserById } from '../repositories/userRepository'

export function getUserProfile(app: Application) {
  app.get('/api/v1/profile', async (req, res) => {
    if (!req.signedCookies.ssid) {
      res.status(401).send({ message: 'Unauthorized' })
      return
    }

    const user = await findUserById(req.signedCookies.ssid)

    res.send(user)
  })
}

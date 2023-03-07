import { Application } from 'express-ws'
import { findUserById, updateUser } from '../repositories/userRepository'

export function putUserProfile(app: Application) {
  app.put('/api/v1/profile', async (req, res) => {
    if (!req.signedCookies.ssid) {
      res.status(401).send({ message: 'Unauthorized' })
      return
    }

    if (!req.body.name || !req.body.email) {
      res.status(400).send({ message: 'Bad Request' })
      return
    }

    const user = await updateUser(req.signedCookies.ssid, req.body.email, req.body.name)

    res.send(user)
  })
}

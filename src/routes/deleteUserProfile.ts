import { Application } from 'express-ws'
import { deleteUser } from '../repositories/userRepository'

export function deleteUserProfile(app: Application) {
  app.delete('/api/v1/profile', async (req, res) => {
    if (!req.signedCookies.ssid) {
      res.status(401).send({ message: 'Unauthorized' })
      return
    }

    await deleteUser(req.signedCookies.ssid)

    res.send({ message: 'OK' })
  })
}

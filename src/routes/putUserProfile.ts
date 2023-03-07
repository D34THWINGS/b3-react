import { Application } from 'express-ws'
import multer from 'multer'
import path from 'path'
import { updateUser } from '../repositories/userRepository'

export function putUserProfile(app: Application) {
  app.put('/api/v1/profile', multer({ dest: 'uploads/' }).single('photo'), async (req, res) => {
    if (!req.signedCookies.ssid) {
      res.status(401).send({ message: 'Unauthorized' })
      return
    }

    if (!req.body.name || !req.body.email) {
      res.status(400).send({ message: 'Bad Request' })
      return
    }

    let photoURL
    if (req.file) {
      photoURL = path.basename(req.file.path)
    }

    const user = await updateUser(req.signedCookies.ssid, {
      email: req.body.email,
      name: req.body.name,
      photoURL,
    })

    res.send(user)
  })
}

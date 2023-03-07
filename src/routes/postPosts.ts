import { Application } from 'express'
import bodyParser from 'body-parser'
import { createPost } from '../repositories/postsRepository'
import { findUserById } from '../repositories/userRepository'

export function postPosts(app: Application) {
  app.post('/api/v1/posts', bodyParser.json(), async (req, res) => {
    if (!req.body.title) {
      return res.status(400).send({
        message: 'Missing title',
      })
    }

    const user = await findUserById(req.signedCookies.ssid)
    if (!user) {
      return res.status(401).send({
        message: 'Unauthorized',
      })
    }

    res.send(await createPost(req.body.title, user))
  })
}

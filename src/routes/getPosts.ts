import { Application } from 'express-ws'
import { findAllPosts } from '../repositories/postsRepository'

export function getPosts(app: Application) {
  app.get('/api/v1/posts', async (req, res) => {
    res.send(await findAllPosts())
  })
}

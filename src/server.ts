import expressWs, { Application } from 'express-ws'
import express, { Request, Response, NextFunction } from 'express'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import path from 'path'
import { getLogin } from './routes/getLogin'
import { getRoot } from './routes/getRoot'
import { getWs } from './routes/getWs'
import { postLogin } from './routes/postLogin'
import { authenticationMiddleware } from './middlewares/authenticationMiddleware'
import { getRegister } from './routes/getRegister'
import { postRegister } from './routes/postRegister'
import { getPosts } from './routes/getPosts'
import { postLogout } from './routes/postLogout'
import { deleteUserProfile } from './routes/deleteUserProfile'
import { getUserProfile } from './routes/getUserProfile'
import { putUserProfile } from './routes/putUserProfile'
import { getEvents } from './routes/getEvents'
import { postPosts } from './routes/postPosts'
import { postEvents } from './routes/postEvents'
import { getEvent } from './routes/getEvent'
import { deleteEvent } from './routes/deleteEvent'
import { putEvent } from './routes/putEvent'

const SECRET_KEY = 'MySecretKeyIsAwesome'

function main() {
  const app = express() as unknown as Application
  expressWs(app)
  const sockets = new Map()

  app.use((req, res, next) => {
    console.log(new Date().toISOString(), req.method, req.path)
    next()
  })
  app.use(cookieParser(SECRET_KEY))
  app.use(compression())
  app.use(express.static(path.join(__dirname, '../app/dist')))
  app.use('/api/uploads', express.static(path.join(__dirname, '../uploads')))

  getLogin(app)
  postLogin(app)
  getRegister(app)
  postRegister(app)

  app.use(authenticationMiddleware)
  postLogout(app)
  getRoot(app)
  getWs(app, sockets)
  getPosts(app)
  postPosts(app)
  getUserProfile(app)
  putUserProfile(app)
  deleteUserProfile(app)
  getEvents(app)
  postEvents(app)
  getEvent(app)
  putEvent(app)
  deleteEvent(app)

  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(error)
    res.status(500).send('Internal Server Error')

    next()
  })

  app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
  })
}

main()

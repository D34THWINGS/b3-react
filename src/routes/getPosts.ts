import {Application} from "express-ws";

export function getPosts(app: Application) {
  app.get('/posts', (req, res) => {
    res.send([
      {
        id: 1,
        title: 'Post 1',
        author: {
          id: 1,
          photoURL: 'https://placekitten.com/200/300',
          name: 'John Doe',
        },
      },
      {
        id: 2,
        title: 'Post 1',
        author: {
          id: 1,
          photoURL: 'https://placekitten.com/200/300',
          name: 'John Doe',
        },
      },
      {
        id: 3,
        title: 'Post 1',
        author: {
          id: 2,
          photoURL: 'https://placekitten.com/200/300',
          name: 'Macron',
        },
      }
    ])
  })
}

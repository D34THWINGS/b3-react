import { Application } from 'express-ws'

export function getEvents(app: Application) {
  app.get('/api/v1/events', (req, res) => {
    res.send([
      {
        id: 1,
        title: 'Post 1',
        date: '2020-01-01T00:00:00.000Z',
        author: {
          id: 1,
          photoURL: 'https://placekitten.com/200/300',
          name: 'John Doe',
        },
      },
      {
        id: 2,
        title: 'Post 2',
        date: '2022-03-01T00:00:00.000Z',
        author: {
          id: 1,
          photoURL: 'https://placekitten.com/200/300',
          name: 'John Doe',
        },
      },
      {
        id: 3,
        title: 'Post 3',
        date: '2023-06-12T00:00:00.000Z',
        author: {
          id: 2,
          photoURL: 'https://placekitten.com/200/300',
          name: 'Macron',
        },
      },
    ])
  })
}

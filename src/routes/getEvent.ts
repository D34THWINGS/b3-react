import { Application } from 'express'
import { findEventById } from '../repositories/eventsRepository'

export function getEvent(app: Application) {
  app.get('/api/v1/event/:eventId', async (req, res) => {
    const { eventId } = req.params
    const event = await findEventById(eventId)
    if (!event) {
      return res.status(404).json({ message: 'Event not found' })
    }
    res.json(event)
  })
}

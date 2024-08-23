import { Router } from 'express';
import { createEvent, getUserEvents, getAllEvents, updateEvent, deleteEvent } from '../controllers/eventController';
import auth from '../middlewares/auth'; 

const router = Router();

// Route to create an event (Requires authentication)
router.post('/events/create', auth, createEvent);

// Route to get events created by the authenticated user (Requires authentication)
router.get('/events/my-events', auth, getUserEvents);

// Route to get all events (Publicly accessible)
router.get('/events/all', getAllEvents);

// Route to update an event created by the authenticated user (Requires authentication)
router.put('/events/:id', auth, updateEvent);

// Route to delete an event created by the authenticated user (Requires authentication)
router.delete('/events/:id', auth, deleteEvent);

export default router;

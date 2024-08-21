import { Router } from 'express';
import { createEvent, getUserEvents, getAllEvents } from '../controllers/eventController';
import auth from '../middlewares/auth'; 
const router = Router();

// Route to create an event
router.post('/events/create', auth, createEvent);

// Route to get events created by the authenticated user
router.get('/events/my-events', auth, getUserEvents);

// Route to get all events (could be public events)
router.get('/events/all', getAllEvents);

export default router;

import { Request, Response } from 'express';
import Event from '../models/Event';

interface AuthRequest extends Request {
    user?: { id: string; role: string };
}

export const createEvent = async (req: AuthRequest, res: Response) => {
    try {

        console.log('Authenticated user:', (req as any).user);
        console.log('Request body:', req.body);

        const { title, description, date, location } = req.body;
        const event = new Event({
            title,
            description,
            date,
            location,
            createdBy: req.user!.id,
        });

        await event.save();
        res.status(201).json(event);
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ error: 'Error creating event' });
    }
};

export const getUserEvents = async (req: AuthRequest, res: Response) => {
    try {
        const events = await Event.find({ createdBy: req.user?.id });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching events' });
    }
};

export const getAllEvents = async (req: Request, res: Response) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching events' });
    }
};

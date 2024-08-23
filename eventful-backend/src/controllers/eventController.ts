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

export const updateEvent = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        
        const event = await Event.findOneAndUpdate(
            { _id: id, createdBy: req.user?.id },
            updates,
            { new: true }
        );

        if (!event) {
            return res.status(404).json({ error: 'Event not found or not authorized to update' });
        }

        res.status(200).json(event);
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ error: 'Error updating event' });
    }
};

export const deleteEvent = async (req: AuthRequest, res: Response) => {
    try {
        if (req.user?.role !== 'creator') {
            return res.status(403).json({ message: 'Forbidden: Only creators can delete events' });

    }
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (event.createdBy.toString() !== req.user!.id) {
            return res.status(403).json({ message: 'Forbidden: You are not authorized to delete this event' });
        }

        await event.deleteOne();
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting event' });
    }
};
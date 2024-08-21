import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

const register = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;

    try {
        // Log the registration attempt
        console.log('Registering user with email:', email);

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Create new user object
        user = new User({ name, email, password, role });

        // Log the user object before saving
        console.log('User object before saving:', user);

        // Save the user to the database
        await user.save();

        // Log after successful save
        console.log('User saved successfully:', user);

        // Create JWT payload
        const payload = { userId: user.id, role: user.role };

        // Sign JWT
        const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' });

        // Send response with token
        res.status(201).json({ token });
    } catch (error) {
        // Log any error that occurs
        console.error('Error during registration:', (error as Error).message, error);
        res.status(500).send('Server error');
    }
};

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = { userId: user.id, role: user.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).send('Server error');
    }
};

export { register, login };

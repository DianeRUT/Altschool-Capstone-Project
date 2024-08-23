import { Request, Response } from 'express';
import User from '../models/User';

interface UAuthRequest extends Request {
    user?: { id: string; role: string };
}

const getProfile = async (req: UAuthRequest, res: Response) => {
    try {
        const user = await User.findById(req.user?.id).select('-password');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json({ profile: user });
    } catch (error) {
        // console.error('Server error:', error);
        res.status(500).json({msg: 'Server error' });
    }
};

const updateProfile = async (req: UAuthRequest, res: Response) => {
    const { name, email } = req.body;
    try {
        let user = await User.findById(req.user?.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        user.name = name || user.name;
        user.email = email || user.email;

        await user.save();
        res.json({ success: true, data: user });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export { getProfile, updateProfile };

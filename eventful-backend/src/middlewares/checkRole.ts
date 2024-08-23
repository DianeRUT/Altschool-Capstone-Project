import { Request, Response, NextFunction } from 'express';

interface AuthRequest extends Request {
    user?: { id: string; role: string };
}

const checkRole = (role: string) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (req.user?.role !== role) {
            return res.status(403).json({ message: 'Forbidden: You do not have the required role' });
        }
        next();
    };
};

export default checkRole;

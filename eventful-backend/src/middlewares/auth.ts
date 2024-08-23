import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface IAuthRequest extends Request {
    user?: { id: string; role: string };
}

const auth = (req: IAuthRequest, res: Response, next: NextFunction) => {

    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    const token = req.header('Authorization')?.split(' ')[1];
    console.log("Token received:", token);

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string; role: string };
        console.log("Decoded token:", decoded);
        req.user = { id: decoded.userId, role: decoded.role };

        next();
    } catch (err) {
        console.error("Token verification error:", err);
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

export default auth;

import jwt from 'jsonwebtoken';
import UserModel  from '../models/Auth.js';

const TokenVerification = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token) return res.status(401).json({ message: "Unauthorized: Token not found" });
        const decoded = await jwt.decode(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded.userId);
        if(!user) return res.status(401).json({ message: "Unauthorized: User not found" });
        req.userId = user._id;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Token not found" });
    }
};

export { TokenVerification };
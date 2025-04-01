import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

const protect = async (req, res, next) => {
  const token = req.cookies.jwt;
  console.log('🔹 Received Token:', token); // Debug log
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select('-password'); // Exclude password for security

    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }
    next();
  } catch (error) {
    console.error('JWT verification error:', error);
    res.status(401).json({ message: 'Not authorized, invalid token' });
  }
};

export default protect;

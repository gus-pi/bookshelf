import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    ssecure: process.env.NODE_ENV === 'production', // Only secure in production,
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', // Lax for local testing
  });
};

export default generateToken;

import User from '../models/UserModel.js';

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    }
  } catch (error) {
    console.log('Error registering user: ', error);
    res.status(500).json({ message: 'Error registering user' });
  }
};

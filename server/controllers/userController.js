import User from '../models/UserModel.js';

//register user endpoint
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

//get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'id name email').sort({ createdAt: -1 });
    if (!users) {
      res.status(404).json({ message: 'No users found' });
    }
    res.status(200).json(users);
  } catch (error) {
    console.log('Error fetching users: ', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
};

//get user by id endppoint
export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log('Error fetching user: ', error);
    res.status(500).json({ message: 'Error fetching user' });
  }
};

//get user by id endppoint
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    console.log('Error deleting user: ', error);
    res.status(500).json({ message: 'Error deleting user' });
  }
};

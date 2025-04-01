import User from '../models/UserModel.js';
import generateToken from '../utils/generateToken.js';

//login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    const passwordMatch = await user.verifyPassword(password);
    if (user && passwordMatch) {
      generateToken(res, user._id);
      return res.status(201).json({
        message: 'Logged in successful',
        user: { id: user._id, name: user.name, email: user.email },
      });
    } else {
      return res.status(401).json({ message: 'invalid credentials' });
    }
  } catch (error) {
    console.log('Error logging in: ', error);
    res.status(500).json({ message: 'Error logging in' });
  }
};

//logout user
export const logoutUser = async (req, res) => {
  res.clearCookie('token');
  res.status(200).send({ message: 'Logged out successfully' });
};

//register user endpoint
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, books } = req.body;
    const user = await User.create({ name, email, password, books });
    if (user) {
      generateToken(res, user._id); //auth user after creation
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        books: user.books,
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
      return res.status(404).json({ message: 'No users found' });
    }
    res.status(200).json(users);
  } catch (error) {
    console.log('Error fetching users: ', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
};

//get user by id
export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log('Error fetching user: ', error);
    res.status(500).json({ message: 'Error fetching user' });
  }
};

//get logged in user profile
export const getUserProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    res.status(200).json({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

//delete user
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    console.log('Error deleting user: ', error);
    res.status(500).json({ message: 'Error deleting user' });
  }
};

//add book to user
export const addBook = async (req, res) => {
  console.log('Received params:', req.params);
  console.log('Received body:', req.body); // <-- Debug here
  const { id } = req.params;
  const { bookKey } = req.body;
  try {
    if (!bookKey) {
      return res.status(500).json({ message: 'book id required' });
    }

    // Ensure the logged-in user is accessing their own bookshelf
    if (req.user.id !== id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { $addToSet: { books: bookKey } }, // Prevent duplicates
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'added a book', books: user.books });
  } catch (error) {
    console.log('Error adding book: ', error);
    res.status(500).json({ message: 'Error adding book' });
  }
};

//delete book from user
export const removeBook = async (req, res) => {
  const { id } = req.params;
  const { bookKey } = req.body;
  try {
    if (!bookKey) {
      res.status(500).json({ message: 'book id required' });
    }
    const user = await User.findByIdAndUpdate(
      id,
      { $pull: { books: bookKey } },
      { new: true }
    );
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'removed a book', books: user.books });
  } catch (error) {
    console.log('Error removing user book: ', error);
    res.status(500).json({ message: 'Error removing user book' });
  }
};

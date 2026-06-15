import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Create a new user
export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, avatar, roles } = req.body;
    const user = await User.create({ name, email, phone, password, avatar, roles });

    // Check all required fields are provided
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Generate a token for the user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ 
        message: 'User created successfully', user, token });
  } catch (error) {
    res.status(400).json({ message: "Error creating user", error: error.message });
  }
}; 


//login user and generate token
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch ) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a token 
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token, user });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

//log out user

export const logoutUser = async (req, res) => {
  try { 
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ message: "Error logging out", error: error.message });
  }
};


const argon2 = require('argon2');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

// Admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    const validPassword = await argon2.verify(admin.password, password);
    if (!validPassword) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Admin registration
const registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if the admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({ message: 'Admin with this email already exists' });
    }

    // Hash the password
    const hashedPassword = await argon2.hash(password);

    // Create and save the new admin
    const newAdmin = new Admin({ email, password: hashedPassword });
    await newAdmin.save();

    // Success response
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    // Handle server errors
    console.error('Error in registerAdmin:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
module.exports = { loginAdmin, registerAdmin };

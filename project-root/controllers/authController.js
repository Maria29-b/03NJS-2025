import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';



export const register = async (req, res) => {
    const { email, password } = req.body;
  

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists.' });
    }
  
  const hashedPassword = bcrypt.hashSync(password, 10);

 
  const newUser = new User({
    email,
    password: hashedPassword
  });

  await newUser.save();


  const { password: pwd, ...userWithoutPassword } = newUser.toObject();
  res.status(201).json(userWithoutPassword);
} catch (err) {
  res.status(500).json({ message: 'Server error', error: err.message });
}
};




export const login = async (req, res) => {
    const { email, password } = req.body;

  // on Vérifie si l'utilisateur existe
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

 
  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  // Créer le token JWT
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET || 'secret123', 
    { expiresIn: '1h' }
  );



res.json({ token });
}catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Exporter les utilisateurs pour les autres contrôleurs
export const getAllUsersList = async () => {
    return await User.find().select('-password');
  };
  
  export const removeUserById = async (id) => {
    const result = await User.findByIdAndDelete(id);
    return result ? true : false;
  };



  //validation email et mmot de passe 
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  return res.status(400).json({ message: 'Invalid email format.' });
}

if (password.length < 8) {
  return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
}

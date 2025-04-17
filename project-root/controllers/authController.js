import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

let users = [];

export const register = (req, res) => {
  const { email, password } = req.body;


  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists.' });
  }

  
  const hashedPassword = bcrypt.hashSync(password, 10);

 
  const newUser = {
    id: Date.now().toString(),
    email,
    password: hashedPassword
  };

  users.push(newUser);


  const { password: pwd, ...userWithoutPassword } = newUser;
  res.status(201).json(userWithoutPassword);
};

export const login = (req, res) => {
  const { email, password } = req.body;

  // Vérifier si l'utilisateur existe
  const user = users.find(user => user.email === email);
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
    process.env.JWT_SECRET || 'secret123', // à remplacer par un vrai secret dans .env
    { expiresIn: '1h' }
  );

  res.json({ token });
};

// Exporter les utilisateurs pour les autres contrôleurs
export const getAllUsersList = () => users;
export const removeUserById = (id) => {
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    users.splice(index, 1);
    return true;
  }
  return false;
};

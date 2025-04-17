import express from "express";
import authRoutes from "./routes/auth.js" ;


const app = express();
const PORT = 3000;

app.use(express.json()); 

const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

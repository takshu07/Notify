// server.js — entry point
require('dotenv').config(); // MUST be first

const express = require('express');
const connectDB = require('./src/config/db');
const routes = require('./src/routes/index'); // safe to require after dotenv
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


(async () => {
  try {
    await connectDB();          
    app.use('/api', routes);

    app.get('/', (req, res) => res.send('Server running with successful db connection'));


    
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
})();

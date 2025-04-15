// index.js
require('dotenv').config({ path: '.env.local' });

const express = require('express');
const app = express();
const port = 3000;

const healthRoute = require('./routes/healthRoute');
const registerRoute = require('./routes/registerRoute');
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const productsRoute = require('./routes/productsRoute');

app.use(express.json());
app.use('/health', healthRoute);
app.use('/register', registerRoute);
app.use('/login', authRoute);
app.use(productsRoute);
app.use(userRoute);

app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});

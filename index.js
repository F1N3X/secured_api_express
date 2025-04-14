// index.js
const express = require('express');
const app = express();
const port = 3000;

const healthRoute = require('./routes/healthRoute');

app.use('/health', healthRoute);

app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});

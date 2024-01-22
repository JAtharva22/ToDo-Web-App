const cors = require('cors');
const express = require('express');
const connectToMongo = require('./db');

require('dotenv').config();
const PORT = process.env.PORT || 6010;

const app = express()

app.use(cors());
app.use(express.json());

connectToMongo();

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/', require('./routes/task'))


app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
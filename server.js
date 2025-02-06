require('dotenv').config();
const express = require('express');

const app = express();
const routes = require('./routes/router');

app.use(express.json());

// Middleware
app.use((req, res, next) => {
    console.log(req.url);
    next();
});

app.use('/v1', routes);

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}.`);
});
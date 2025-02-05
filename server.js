const express = require('express');

const app = express();
const router = require('./routes/router');

app.use(express.json());

// Middleware
app.use((req, res, next) => {
    console.log(req.url);
    next();
});

app.use('/v1', router);

app.listen(8080, () => {
    console.log('Server listening on port 8080.');
});
const express = require('express')
const router = express.Router();

const person = require('./person');

router.use('/person', person);

router.get('/', (req, res) => {
    res.send('Hello world!');
});

router.get('/saludo/:name', (req, res) => {
    const { name } = req.params;
    res.send(`Hola ${name}!`);
});

router.get('/busqueda', (req, res) => {
    const { firstName, lastName } = req.query;
    // res.header({ 'content-type': 'text/plain' })
    res.send(`Buscando... <br/> First Name: ${firstName} <br/> Last Name: ${lastName}`);
});

module.exports = router
const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

// Middleware
app.use((req, res, next) => {
    console.log(req.url);
    next();
});

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.get('/saludo/:name', (req, res) => {
    const { name } = req.params;
    res.send(`Hola ${name}!`);
});

app.get('/busqueda', (req, res) => {
    const { firstName, lastName } = req.query;
    // res.header({ 'content-type': 'text/plain' })
    res.send(`Buscando... <br/> First Name: ${firstName} <br/> Last Name: ${lastName}`);
});


// Create
app.post('/person', (req, res) => {

    const newPerson = req.body;

    fs.readFile('people.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ 'error': 'Error reading JSON file.' });
        } else {
            const jsonData = JSON.parse(data);
            newPerson.id = jsonData.length + 1;
            jsonData.push(newPerson);

            fs.writeFile('people.json', JSON.stringify(jsonData), (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ 'error': 'Error writting JSON file.' });
                }

                res.status(201).json(newPerson);
            })
        }
    });
});

// Read
app.get('/person/:id', (req, res) => {
    const { id } = req.params;
    fs.readFile('people.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ 'error': 'Error reading JSON file.' });
        } else {
            const jsonData = JSON.parse(data);
            const item = [...jsonData].find(el => el.id === Number(id));
            if (item) {
                res.status(200).json(item);
            } else {
                res.status(404).json({ 'error': 'Person not found.' })
            }
        }
    });
});

// Update
app.put('/person/:id', (req, res) => {
    const { id } = req.params;
    const person = req.body;

    fs.readFile('people.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ 'error': 'Error reading JSON file.' });
        } else {
            const jsonData = JSON.parse(data);
            const items = [...jsonData].filter(el => el.id !== Number(id));
            let item = [...jsonData].find(el => el.id === Number(id));

            item = { ...item, ...person};

            items.push(item);

            fs.writeFile('people.json', JSON.stringify(items), (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ 'error': 'Error writting JSON file.' });
                }

                res.status(201).json(item);
            })
        }
    });
});

// Delete
app.delete('/person/:id', (req, res) => {
    const { id } = req.params;
    fs.readFile('people.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ 'error': 'Error reading JSON file.' });
        } else {
            const jsonData = JSON.parse(data);
            let item = [...jsonData].find(el => el.id === Number(id));
            console.log(item);
            const items = [...jsonData].filter(el => el.id !== Number(id));

            fs.writeFile('people.json', JSON.stringify(items), (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ 'error': 'Error writting JSON file.' });
                }

                res.status(200).json(item);
            })
        }
    });
});

app.listen(8080, () => {
    console.log('Server listening on port 8080.');
});
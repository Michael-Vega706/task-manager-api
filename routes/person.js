const fs = require('fs');

const express = require('express')
const router = express.Router();

// Create/
router.post('/', (req, res) => {

    const newPerson = req.body;

    if (!newPerson.firstName || newPerson.firstName === '' || typeof newPerson.firstName !== 'string') {
        return res.status(400).json({
            'error': 'Invalid field firstName'
        });
    }

    if (!newPerson.lastName || newPerson.lastName === '' || typeof newPerson.firstName !== 'string') {
        return res.status(400).json({
            'error': 'Invalid field lastName'
        });
    }
    
    fs.readFile('people.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ 'error': 'Error reading JSON file.' });
        } else {
            const jsonData = JSON.parse(data);
            newPerson.id = jsonData.length + 1;
            jsonData.push(newPerson);

            fs.writeFile('people.json', JSON.stringify(jsonData), (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ 'error': 'Error writting JSON file.' });
                }

                return res.status(201).json(newPerson);
            })
        }
    });
});

// Read
router.get('/:id', (req, res) => {
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
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    fs.readFile('people.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ 'error': 'Error reading JSON file.' });
        } else {
            const jsonData = JSON.parse(data);
            let item = [...jsonData].find(el => el.id === Number(id));
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

module.exports = router;
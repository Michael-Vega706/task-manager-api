const express = require('express')
const router = express.Router()

let employees = [
    {
        "id": 1,
        "firstName": "David",
        "lastName": "Suarez",
        "email": "dsuarez@mailinator.com"
    },
    {
        "id": 2,
        "firstName": "Michael",
        "lastName": "Vega",
        "email": "mvega@mailinator.com"
    }
];

// Create
router.post('/', (req, res) => {
    const { firstName, lastName, email } = req.body;
    const size = employees.length;
    const item = { id: size + 1, firstName, lastName, email };
    employees.push(item);
    res.status(201).json(item);

})

// Read
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const employeeDB = employees.find(el => el.id === Number(id));
    res.status(200).json(employeeDB || {})
});

router.get('/', (req, res) => {
    const { firstName } = req.query;
    const items = employees.filter(el => el.firstName.includes(firstName));

    if (items.length > 0) {
        return res.status(200).json(items);
    } else {
        return res.status(200).json(employees);
    }

});

// Update
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const data = req.body;

    const employeeDB = employees.find(el => el.id === Number(id));
    const employeeIndex = employees.findIndex(el => el.id === Number(id));

    const item = { ...employeeDB, ...data };
    employees[employeeIndex] = item;

    res.status(200).json(item);
});

// Delete
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const employeeDB = employees.find(el => el.id === Number(id));
    const employeesAux = employees.filter(el => el.id !== Number(id));
    employees = employeesAux;
    res.status(200).json(employeeDB);
});

module.exports = router;
const express = require('express');
const TaskManager = require('./taskManager');

const taskManager = new TaskManager();

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.routes();
    }

    routes() {
        this.app.use(express.json())
        this.app.get('/', (req, res) => {
            res.send('API Krensi - To task management.')
        });

        this.app.post('/task', (req, res) => {

            if (req.body == undefined) {
                return res.status(400).json({
                    'error': 'Body is invalid.'
                });
            }

            const { title, dateTask } = req.body;

            if (!title || title === '' || typeof title !== 'string') {
                return res.status(400).json({
                    'error': 'title has invalid characters.'
                });
            }

            if (!dateTask || dateTask === '' || typeof dateTask !== 'string') {
                return res.status(400).json({
                    'error': 'dateTask has invalid characters.'
                });
            }

            return res.status(200).json(taskManager.createTask(title, dateTask));
        });

        this.app.get('/task', (req, res) => {
            return res.status(200).json(taskManager.getAllTasks());
        });

        this.app.get('/task/:id', (req, res) => {
            const { id } = req.params;

            return res.status(200).json(taskManager.getTaskById(Number(id)));
        })

        this.app.put('/task/:id', (req, res) => {
            const { id } = req.params;

            if (req.body == undefined) {
                return res.status(400).json({
                    'error': 'Body is invalid.'
                });
            }

            const { title, dateTask, isComplete } = req.body;

            if (!title || title === '' || typeof title !== 'string') {
                return res.status(400).json({
                    'error': 'title has invalid characters.'
                });
            }

            if (!dateTask || dateTask === '' || typeof dateTask !== 'string') {
                return res.status(400).json({
                    'error': 'dateTask has invalid characters.'
                });
            }

            if (!isComplete || isComplete === '' || typeof isComplete !== 'boolean') {
                return res.status(400).json({
                    'error': 'isComplete is invalid.'
                });
            }

            return res.status(200).json(taskManager.updateTaskById(Number(id), {title, date: dateTask, isComplete}))
        });

        this.app.delete('/task/:id', (req, res) => {
            const { id } = req.params;
            return res.status(200).json(taskManager.deleteById(Number(id)));
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }

}

module.exports = Server;
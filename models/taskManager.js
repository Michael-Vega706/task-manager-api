const Task = require('./task');

class TaskManager {

    constructor() {
        this.tasks = [];
        this.nextId = 1;
    }

    createTask(title, date) {
        const task = new Task(this.nextId++, title, date);
        this.tasks.push(task);
        return task;
    }

    getAllTasks() {
        return this.tasks;
    }

    getTaskById(id) {
        return this.tasks.find(task => task.id === id) || null;
    }

    updateTaskById(id, taskData) {
        const task = this.getTaskById(id);
        
        if (!task) return null;

        if (taskData.title) task.title = taskData.title;
        if (taskData.date) task.date = taskData.date;
        if (taskData.isComplete) task.updateStatus(taskData.isComplete);

        return task;
    }

    deleteById(id) {
        const index = this.tasks.findIndex(task => task.id === id);
        if (index !== -1) {
            return this.tasks.splice(index, 1)[0];
        }
        return null;
    }
}

module.exports = TaskManager;
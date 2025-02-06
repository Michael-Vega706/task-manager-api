class Task {
    
    constructor(id, title, date) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.isComplete = false;
    }

    updateStatus(isComplete) {
        this.isComplete = isComplete;
    }
}

module.exports = Task
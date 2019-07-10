const mongoose = require('../../database/index');
const bcrypt = require('bcryptjs');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    completed: {
        type: Boolean,
        required: true,
        default: false,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
});


const Task = mongoose.model('Task', TaskSchema);


module.exports = Task;
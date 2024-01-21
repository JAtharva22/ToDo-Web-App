const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    title: { type: String, required: true },
    description: { type: String },
    tags: { type: [String], default: [], index: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    date_created: { type: Date, default: Date.now },
});

taskSchema.index({ tags: 1 });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;

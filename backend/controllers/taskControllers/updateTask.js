const path = require('path');
const Task = require(path.resolve(__dirname, '../../models/Task'));
const { validationResult } = require('express-validator');

const updateTask = async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return res.status(400).json({ success: false, errors: validationErrors.array() });
    }
    
    try {
        const { title, description, tags, startDate, endDate } = req.body;

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.taskId,
            { title, description, tags, startDate, endDate },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        res.json({ success: true, message: "Task has been updated", updatedTask });
        
    } catch (error) {
        console.error(error.message);

        if (error.name === 'CastError') {
            return res.status(400).json({ success: false, message: "Invalid Task ID" });
        }

        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = updateTask;
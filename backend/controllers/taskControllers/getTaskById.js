const path = require('path');
const Task = require(path.resolve(__dirname, '../../models/Task'));

const getTasksById = async (req, res) => {
    try {
        const task = await Task.findOne({
            userId: req.user.id,
            _id: req.params.taskId,
        });

        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        res.json({ success: true, message: "Found the task", task });
        
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = getTasksById;
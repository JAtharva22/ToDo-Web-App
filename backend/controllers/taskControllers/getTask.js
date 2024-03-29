const path = require('path');
const Task = require(path.resolve(__dirname, '../../models/Task'));

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id });

        if (tasks.length === 0) {
            return res.status(404).json({ success: false, message: "No tasks found" });
        }

        res.json({ success: true, message: "Found all the tasks", tasks });
        
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = getTasks;
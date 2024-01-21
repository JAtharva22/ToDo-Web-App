const path = require('path');
const Task = require(path.resolve(__dirname, '../../models/Task'));

const deleteTask = async (req, res) => {
    let success = false;
    try {
        const deletedTask = await Task.deleteOne({ 
            userId: req.user.id,
            _id: req.params.taskId
        });

        if (deletedTask) {
            success = true;
            res.json({ success, message: "Task has been deleted", deletedTask });
        } else {
            res.status(404).json({ success, message: "Task Not Found" });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success, message: "Internal Server Error" });
    }
}

module.exports = deleteTask;
const path = require('path');
const Task = require(path.resolve(__dirname, '../../models/Task'));

const deleteAllTask = async (req, res) => {
    try {
        const deletedAllTask = await Task.deleteMany({ userId: req.user.id });

        if (deletedAllTask.deletedCount > 0) {
            res.status(200).json({ success: true, message: `${deletedAllTask.deletedCount} Tasks have been deleted` });
        } else {
            res.status(404).json({ success: false, message: "No tasks found for the user" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

module.exports = deleteAllTask;

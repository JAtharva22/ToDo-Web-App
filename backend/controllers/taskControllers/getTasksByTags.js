const path = require('path');
const Task = require(path.resolve(__dirname, '../../models/Task'));

const getTaskSearch = async (req, res) => {
    try {
        const InputTag = req.body.tag;

        if (!InputTag) {
            return res.status(400).json({ success: false, message: "Please provide 'key' parameter" });
        }

        const tasks = await Task.find({
            userId: req.user.id,
            tags: { $in: [InputTag] },
        });

        if (tasks.length === 0) {
            return res.status(404).json({ success: false, message: "No tasks found" });
        }

        res.json({ success: true, message: "Found the tasks by tags", tasks });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = getTaskSearch;

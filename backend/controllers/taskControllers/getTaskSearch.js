const path = require('path');
const Task = require(path.resolve(__dirname, '../../models/Task'));

const getTaskSearch = async (req, res) => {
    try {
        const tagOrTitle = req.query.key;

        if (!tagOrTitle) {
            return res.status(400).json({ success: false, message: "Please provide 'key' parameter" });
        }

        const query = {
            userId: req.user.id,
            $or: [
                { tags: { $in: [new RegExp(tagOrTitle, 'i')] } },
                { title: { $regex: new RegExp(tagOrTitle, 'i') } },
            ],
        };

        const tasks = await Task.find(query);

        if (tasks.length === 0) {
            return res.status(404).json({ success: false, message: "No tasks found" });
        }

        res.json({ success: true, message: "Found the tasks", tasks });
        
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = getTaskSearch;

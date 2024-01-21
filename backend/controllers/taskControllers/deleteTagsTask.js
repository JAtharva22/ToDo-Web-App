const path = require('path');
const Task = require(path.resolve(__dirname, '../../models/Task'));

const deleteTagsTask = async (req, res) => {
    try {
        const tagToDelete = req.body.tag;

        // Find tasks that have only the specified tag and no other tags
        const tasksToDelete = await Task.find({
            userId: req.user.id,
            tags: { $all: [tagToDelete], $size: 1 },
        });

        // Delete the tasks that have only the specified tag
        const result = await Task.deleteMany({
            _id: { $in: tasksToDelete.map(task => task._id) },
        });

        // Find tasks that include the 'tagToDelete' tag with other tags in 'tags' array
        const tasksToUpdate = await Task.find({
            userId: req.user.id,
            tags: { $in: [tagToDelete] },
        });

        // Update: Remove the 'tagToDelete' tag from the array 'tags' in the other tasks
        if (tasksToUpdate && tasksToUpdate.length > 0) {
            const updateResult = await Task.updateMany(
                { _id: { $in: tasksToUpdate.map(task => task._id) } },
                { $pull: { tags: tagToDelete } }
            );
            console.log(`tasks updated.`);
        }

        if (result.deletedCount > 0) {
            res.status(200).json({
                success: true,
                message: `${result.deletedCount} tasks have been deleted`,
            });
        } else {
            res.status(404).json({ success: false, message: "No tasks found for the user" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = deleteTagsTask;

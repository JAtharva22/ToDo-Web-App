const path = require('path');
const Task = require(path.resolve(__dirname, '../../models/Task'));
const { validationResult } = require('express-validator');

const addTask = async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        const { title, description, tags, startDate, endDate } = req.body;
        console.log(tags)

        const newTask = new Task({
            userId: req.user.id,
            title,
            tags,
            description,
            startDate,
            endDate,
        });

        const savedTask = await newTask.save();

        res.json({ success: true, message: "created the task", savedTask });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = addTask;

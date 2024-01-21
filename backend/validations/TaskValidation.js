const { body } = require('express-validator');

const TaskValidation = [
    body('title').trim().notEmpty().withMessage('Title cannot be empty'),
    body('startDate').isISO8601().toDate().withMessage('Invalid start date format'),
    body('endDate').isISO8601().toDate().withMessage('Invalid end date format'),
    // body('tags').isArray().withMessage('Tags must be an array'),
];

module.exports = { TaskValidation };

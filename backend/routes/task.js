const express = require('express');
const router = express.Router();

const fetchuser = require('../middleware/fetchuser');
const { TaskValidation } = require('../validations/TaskValidation');

const addTask = require('../controllers/taskControllers/addTask');
const updateTask = require('../controllers/taskControllers/updateTask');
const deleteTask = require('../controllers/taskControllers/deleteTask');
const deleteAllTask = require('../controllers/taskControllers/deleteAllTask');
const getTasks = require('../controllers/taskControllers/getTask');
const deleteTagsTask = require('../controllers/taskControllers/deleteTagsTask');
const getTaskSearch = require('../controllers/taskControllers/getTaskSearch');
const getTasksById = require('../controllers/taskControllers/getTaskById');
const getTasksByTags = require('../controllers/taskControllers/getTasksByTags');

// ROUTE 1: POST "/api/tasks/addtask". Login required
router.post('/addtask', fetchuser, TaskValidation, addTask);

// ROUTE 2: PUT "/api/tasks/updatetask/:taskId". Login required
router.put('/updatetask/:taskId', fetchuser, TaskValidation, updateTask);

// ROUTE 3: DELETE "/api/tasks/deletetask/:taskId". Login required
router.delete('/deletetask/:taskId', fetchuser, deleteTask);

// ROUTE 4: DELETE "/api/tasks/deletealltask". Login required
router.delete('/deletealltask', fetchuser, deleteAllTask);

// ROUTE 5: DELETE "/api/tasks/deletetagstask". Login required
router.delete('/deletetagstask', fetchuser, deleteTagsTask);

// ROUTE 6: GET "/api/tasks/gettask". Login required
router.get('/gettask', fetchuser, getTasks);

// ROUTE 7: GET "/api/tasks/gettask/:taskId". Login required
router.get('/gettask/:taskId', fetchuser, getTasksById);

// ROUTE 8: GET "/api/tasks/gettaskbytags/:key". Login required
router.get('/gettaskbytags/', fetchuser, getTasksByTags);

// ROUTE 9: GET "/api/tasks/tasksearch/:key". Login required
router.get('/tasksearch/:key', fetchuser, getTaskSearch);

module.exports = router;

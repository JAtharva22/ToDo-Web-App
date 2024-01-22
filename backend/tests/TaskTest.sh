# CREATE : --------------------------------------------------
# add task. auth token from signin/login required
curl -X POST -H "Content-Type: application/json" -H "auth-token: " -d '{"title": "test1", "tags": ["work"], "description": "this is for testing", "startDate": "2024-01-20", "endDate": "2024-01-22"}' https://todobackend-nwsy.onrender.com/addtask
curl -X POST -H "Content-Type: application/json" -H "auth-token: " -d '{"title": "test2", "tags": ["school"], "description": "this is for testing", "startDate": "2024-01-20", "endDate": "2024-01-22"}' https://todobackend-nwsy.onrender.com/addtask


# READ : ----------------------------------------------------
# get all task. auth token from signin/login required
curl -X GET -H "Content-Type: application/json" -H "auth-token: " https://todobackend-nwsy.onrender.com/gettask

# get one task by id. auth token from signin/login required
# replace taskId by appropriate ID in url(you can get id of tasks from above curl test) 
curl -X GET -H "Content-Type: application/json" -H "auth-token: " https://todobackend-nwsy.onrender.com/gettask/:taskId

# get one task by tags. auth token from signin/login required
# replace tag by appropriate tag in url
curl -X GET -H "Content-Type: application/json" -H "auth-token: " https://todobackend-nwsy.onrender.com/gettaskbytags/:tag
curl -X GET -H "Content-Type: application/json" -H "auth-token: " https://todobackend-nwsy.onrender.com/gettaskbytags/work

# get tasks by search. auth token from signin/login required
# replace value by appropriate tag or title in url
curl -X GET -H "Content-Type: application/json" -H "auth-token: " https://todobackend-nwsy.onrender.com/tasksearch/?key=value 
curl -X GET -H "Content-Type: application/json" -H "auth-token: " https://todobackend-nwsy.onrender.com/tasksearch/?key=work 


# UPDATE: -----------------------------------------------------
# update task. auth token from signin/login required
# replace taskId by appropriate ID in url(you can get id of tasks from above curl test) 
curl -X PUT -H "Content-Type: application/json" -H "auth-token: " -d '{"title": "working"}' https://todobackend-nwsy.onrender.com/updatetask/:taskId


# DELETE: ------------------------------------------------------
# delete task. auth token from signin/login required
# replace taskId by appropriate ID in url(you can get id of tasks from above curl test) 
curl -X DELETE -H "Content-Type: application/json" -H "auth-token: " https://todobackend-nwsy.onrender.com/deletetask/:taskId

# delete all task. auth token from signin/login required
curl -X DELETE -H "Content-Type: application/json" -H "auth-token: " https://todobackend-nwsy.onrender.com/deletealltask

# delete task based on tag. auth token from signin/login required
# replace taskId by appropriate ID in url(you can get id of tasks from above curl test) 
curl -X DELETE -H "Content-Type: application/json" -H "auth-token: " -d '{"tag": "work"}' https://todobackend-nwsy.onrender.com/deletetagstask/
# sign in
curl -X POST -H "Content-Type: application/json" -d '{"username": "test1", "password": "test1", "email": "test@gmail.com"}' https://todobackend-nwsy.onrender.com/api/auth/createuser

# log in
curl -X POST -H "Content-Type: application/json" -d '{"email": "test@gmail.com", "password": "test1"}' https://todobackend-nwsy.onrender.com/api/auth/login

# update username
curl -X PUT -H "Content-Type: application/json" -H "auth-token: " -d '{"username": "abhi"}' https://todobackend-nwsy.onrender.com/api/auth/updateuser
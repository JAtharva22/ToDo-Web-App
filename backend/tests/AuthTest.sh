# sign in
curl -X POST -H "Content-Type: application/json" -d '{"username": "test1", "password": "test1", "email": "test@gmail.com"}' http://localhost:5000/api/auth/createuser

# log in
curl -X POST -H "Content-Type: application/json" -d '{"email": "test@gmail.com", "password": "test1"}' http://localhost:5000/api/auth/login

# update username
curl -X PUT -H "Content-Type: application/json" -H "auth-token: " -d '{"username": "abhi"}' http://localhost:5000/api/auth/updateuser
# Node.js Assignment 3 API Docs

This document provides the API documentation for **NodeJS Assignment 3**

## Base URL

All API requests are made to the following base URL: http://localhost:3000/api/auth


---

## Endpoints

### 1. **GET /getusers**

Retrieve a list of all users.

- **Description**: Fetches all users stored in the mongodb.
- **Method**: `GET`
- **URL**: `http://localhost:3000/api/auth/getusers`

#### Example Response
```json
[
        {
          "message": "User data fetch successful!",
          "users": [
            {
              "username": "ankush shenoy",
              "email": "ankushshenoy98@gmail.com",
              "createdAt": "2024-11-19T06:29:00.808Z",
              "updatedAt": "2024-11-19T06:29:00.808Z"
            },
            {
              "username": "anonymous user2",
              "email": "anonymousUser@gmail.com",
              "createdAt": "2024-11-19T07:04:17.643Z",
              "updatedAt": "2024-11-19T07:04:18.025Z"
            }
          ]
        }
      ]
```

### 2. **POST /create**

Create a new user.

- **Description**: Creates a new user.
- **Method**: `POST`
- **URL**: `http://localhost:3000/api/auth/create`

#### Request Body
```json
{
    "username":"Ankush Shenoy",
    "email":"ankushshenoy2212@gmail.com",
    "password":"ankushshenoy112"
}
```

#### Example Response
```json
{
    "message": "User creation successful!",
    "user": {
        "email": "ankushshenoy2212@gmail.com",
        "username": "Ankush Shenoy",
        "userID": "67445a84b60e8023067e97a7",
        "createdAt": "2024-11-25T11:07:48.260Z",
        "updatedAt": "2024-11-25T11:07:48.260Z"
    }
}
```
### 3. **PUT /update**

Update a existing user.

- **Description**: Updates a existing user.
- **Method**: `PUT`
- **URL**: `http://localhost:3000/api/auth/update`

#### Request Body
```json
{
    "userID":"67445a84b60e8023067e97a7",
    "username":"anonymous user"
}
```

#### Example Response
```json
{
    "message": "User update successful!",
    "user": {
        "username": "anonymous user",
        "email": "ankushshenoy2212@gmail.com",
        "userID": "67445a84b60e8023067e97a7",
        "createdAt": "2024-11-25T11:07:48.260Z",
        "updatedAt": "2024-11-25T11:07:48.260Z"
    }
}
```

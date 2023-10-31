# Login System with JWT

This is a simple login system with JWT. This project uses stateless refresh tokens so we don't need to store tokens in the database, and there is no logout and token refresh feature.

## Endpoints :

- POST /api/register

Request Body :
```json
{
    "name": "Nursandi",
    "email": "nursandi@example.com",
    "password": "rahasia"
}
```
- POST /api/login

Request Body :
```json
{
    "email": "nursandi@example.com",
    "password": "rahasia"
}
```
- GET /api/dashboard
- GET /api/users

## Installation

For the installation you can clone this project to your local computer.
```sh
git clone https://github.com/sandinur157/login-system-jwt
```

Navigate to the project folder.
```sh
cd login-system-jwt
```

Install required packages.
```sh
npm install
```

Create a new .env file and edit the credentials there.
```sh
cp .env.example .env
```

## Testing
You can try it by running the unit tests or testing manually using postman.
```sh
npx jest
```

Run your app.
If you already have nodemon installed you can run this.
```sh
npm start
```

Or if not, you can run this.
```sh
node src/server.js
```

That's it.
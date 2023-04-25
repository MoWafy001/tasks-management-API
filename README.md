# Tasks Management API
## Description
This is an API for managing tasks.
### Technologies Used
- Typescript
- NodeJS
- TypeORM
- MySQL
- Jest
- Nginx
- ExpressJS


## Go to
- [Tasks Management API](#tasks-management-api)
  - [Description](#description)
    - [Technologies Used](#technologies-used)
  - [Go to](#go-to)
  - [Installation](#installation)
    - [1. Clone the repository](#1-clone-the-repository)
    - [2. Install dependencies](#2-install-dependencies)
    - [3. Create .env file](#3-create-env-file)
    - [4. Add the following to the .env file](#4-add-the-following-to-the-env-file)
    - [5. Run the app](#5-run-the-app)
  - [API Documentation](#api-documentation)

## Installation
### 1. Clone the repository
```bash
git clone https://github.com/MoWafy001/tasks-management-API.git
```
### 2. Install dependencies
```bash
cd tasks-management-API
npm install
```
### 3. Create .env file
```bash 
touch .env
```
### 4. Add the following to the .env file
```bash
PORT=3000

# MySQL Configs
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=task_manager

# JWT Configs
JWT_SECRET=secret
JWT_EXPIRES_IN=30min
```
### 5. Run the app
```bash
npm run dev
```
or
```bash
npm run prod # for production
```

## API Documentation
visit [API Documentation](https://documenter.getpostman.com/view/10674486/Tz5tWv7ohttps://app.swaggerhub.com/apis/DSQ8LJX2_1/Tasks-Management-API/1.0.0#/Task) for more information about the API endpoints.
# Technical Test Backend

## 📌 Project Description
This is a backend project built using **Node.js, Express.js, and MongoDB**. It provides RESTful APIs for user authentication and simple CRUD for data, following best practices for security and scalability.

## 🚀 How to Run the Project Locally

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/farisfadhail/Technical-Test-Backend.git
cd Technical-Test-Backend
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the root directory and add:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 4️⃣ Run the Server
```sh
npm start
```
The server will start at `http://localhost:3000`.

## 📖 API Documentation

### 🏷️ **Item CRUD**

#### 🔹 Get All Items
**Endpoint:** `GET /items`
**Params:**
```json
{
  "page": 1, 
  "limit": 10
}
```
**Response:**
```json
{
  "page": 1,
  "limit": 10,
  "totalPages": 1,
  "totalItems": 6,
  "data": [...items]
}
```

**Image:**

![image](https://github.com/user-attachments/assets/bc0aa40f-62c9-454c-be7d-7c5dc54726f4)

#### 🔹 Create an Item
**Endpoint:** `POST /items`
**Request Body:**
```json
{
  "title": "Soundpeats Clear",
  "description": "TWS Soundpeats Clear merupakan TWS yang bagus",
  "price": 150000
}
```
**Response:**
```json
{
  "message": "Item Created"
}
```

**Image:**

![image](https://github.com/user-attachments/assets/1c326cbe-31f6-41ce-b65c-5e55f376e9e8)

#### 🔹 Get Item by Id
**Endpoint:** `GET /items/:id`
**Response:**
```json
{
  "data": {
      "_id": "67e21cefbe9bd2ed133e0ad4",
      "title": "Soundpeats Clear 2",
      "description": "TWS Soundpeats Clear merupakan TWS yang bagus",
      "price": "150000",
      "createdAt": "2025-03-25T03:03:11.857Z",
      "updatedAt": "2025-03-25T03:07:07.863Z",
      "__v": 0
  }
}
```

**Image:**

![image](https://github.com/user-attachments/assets/1ad8b65c-e875-4790-99f1-8883c41e8e42)

#### 🔹 Update an Item
**Endpoint:** `PUT /items/:id`
**Request Body:**
```json
{
  "title": "Soundpeats Clear Update"
}
```
**Response:**
```json
{
  "message": "Item Updated"
}
```

**Image:**

![image](https://github.com/user-attachments/assets/62eda7a7-23d3-4bca-910e-514aef2d1855)

#### 🔹 Delete an Item
**Endpoint:** `DELETE /items/:id`
**Response:**
```json
{
  "message": "Item Deleted"
}
```

**Image:**

![image](https://github.com/user-attachments/assets/08f3949d-6bae-4644-9ced-53ef8bf33787)

### 🏷️ **User Authentication**

#### 🔹 Register User
**Endpoint:** `POST /auth/register`
**Request Body:**
```json
{
  "email": "faris@yahoo.com",
  "password": "password"
}
```
**Response:**
```json
{
  "message": "User registered successfully",
  "token": "your_jwt_token"
}
```

**Image:**

![image](https://github.com/user-attachments/assets/dc665f4e-503e-427e-b939-de58058e0c9d)

#### 🔹 Login User
**Endpoint:** `POST /auth/login`
**Request Body:**
```json
{
  "email": "faris@yahoo.com",
  "password": "password"
}
```
**Response:**
```json
{
  "message": "Login Successfully",
  "token": "your_jwt_token"
}
```

**Image:**

![image](https://github.com/user-attachments/assets/e197ad23-ec86-4f2c-b84a-5b0f371ba471)

#### 🔹 Get User Profile
**Endpoint:** `GET /profile`
**Headers:**
```json
{
  "Authorization": "Bearer your_jwt_token"
}
```
**Response:**
```json
{
  "message": "User Profile",
  "data": {
      "_id": "67e220b4d82a66caa2d39a1b",
      "email": "faris@yahoo.com",
      "password": "$2b$10$bTcNfoDg0erBpfCZistk8Olj5g.WgKy2qrN8GbJ0gbQVsR1QpScia",
      "createdAt": "2025-03-25T03:19:16.055Z",
      "updatedAt": "2025-03-25T03:19:16.055Z",
      "__v": 0
  }
}
```

**Image:**

![image](https://github.com/user-attachments/assets/3a0154f2-dd11-4c42-9e57-5577db9b9eaf)

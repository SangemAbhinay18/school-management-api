# School Management API

A simple **Node.js + Express + LowDB** backend API for managing school data.  
Allows users to **add new schools** and **retrieve a list of schools sorted by proximity** to a given location.  

This project is deployed on Render and includes a Postman collection for testing.

---

## 📂 Project Structure
school-management/
│
├── server.js # Main API server
├── db.json # JSON database (LowDB)
├── package.json


---

## 🚀 Live API Endpoints

| API | Method | URL | Notes |
|-----|--------|-----|-------|
| Add School (POST) | POST | `https://school-management-api-jqaa.onrender.com/addSchool` | Add a new school. Accepts JSON body: `{ name, address, latitude, longitude }` |
| Add School (GET for browser/demo) | GET | `https://school-management-api-jqaa.onrender.com/addSchool?name=DemoSchool&address=Hyderabad&latitude=17.385&longitude=78.4867` | For demo/testing in browser |
| List Schools | GET | `https://school-management-api-jqaa.onrender.com/listSchools?latitude=17.385&longitude=78.4867` | Returns schools sorted by distance |

---

## 📋 Example Requests

### Add School (POST)

```json
POST /addSchool
Content-Type: application/json

{
  "name": "ABC School",
  "address": "Hyderabad",
  "latitude": 17.385,
  "longitude": 78.4867
}


Response:

{
  "message": "School added successfully",
  "school": {
    "id": 1772804639155,
    "name": "ABC School",
    "address": "Hyderabad",
    "latitude": 17.385,
    "longitude": 78.4867
  }
}

List Schools (GET)
GET /listSchools?latitude=17.385&longitude=78.4867

Response:

[
  {
    "id": 1772804639155,
    "name": "Test School",
    "address": "Hyderabad",
    "latitude": 17.385,
    "longitude": 78.4867,
    "distance": 0
  }
]

Installation & Setup (Local)

Clone the repository:

git clone https://github.com/yourusername/school-management.git
cd school-management

Install dependencies:

npm install

Start the server:

npm start

Server runs on http://localhost:5000 by default.

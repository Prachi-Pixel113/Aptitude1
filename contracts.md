# API Integration Contracts - TriApt

## Overview
This document outlines the API contracts between the frontend and backend for the TriApt engineering aptitude test platform.

## Mock Data Currently Used
The frontend currently uses mock data from `/frontend/src/mock.js`:
- **mockQuestions**: 10 CS/Engineering questions with options and correct answers
- **mockUser**: User authentication data
- **chatbotResponses**: Predefined bot responses
- **mockFAQs**: FAQ data for accordion
- **mockAPI**: Mock authentication and data fetching functions

## Backend API Endpoints Required

### 1. Authentication Endpoints

#### POST /api/auth/register
**Purpose**: User registration
**Request Body**:
```json
{
  "name": "string",
  "email": "string", 
  "password": "string"
}
```
**Response**:
```json
{
  "user": {
    "id": "string",
    "name": "string",
    "email": "string"
  },
  "token": "string",
  "message": "string"
}
```

#### POST /api/auth/login
**Purpose**: User login
**Request Body**:
```json
{
  "email": "string",
  "password": "string"
}
```
**Response**:
```json
{
  "user": {
    "id": "string", 
    "name": "string",
    "email": "string"
  },
  "token": "string",
  "message": "string"
}
```

#### GET /api/auth/me
**Purpose**: Get current user data (requires token)
**Headers**: `Authorization: Bearer <token>`
**Response**:
```json
{
  "id": "string",
  "name": "string", 
  "email": "string"
}
```

### 2. Quiz Endpoints

#### GET /api/quiz/questions
**Purpose**: Fetch 10 random questions for quiz
**Headers**: `Authorization: Bearer <token>`
**Response**:
```json
[
  {
    "id": "number",
    "question": "string",
    "options": ["string", "string", "string", "string"],
    "correctAnswer": "number",
    "category": "string"
  }
]
```

#### POST /api/quiz/submit
**Purpose**: Submit quiz answers and get score
**Headers**: `Authorization: Bearer <token>`
**Request Body**:
```json
{
  "answers": {
    "questionId": "selectedAnswerIndex"
  },
  "timeSpent": "number (seconds)"
}
```
**Response**:
```json
{
  "score": "number",
  "totalQuestions": "number", 
  "correctAnswers": "number",
  "percentage": "number",
  "results": [
    {
      "questionId": "number",
      "userAnswer": "number",
      "correctAnswer": "number",
      "isCorrect": "boolean"
    }
  ]
}
```

## Database Models

### User Model
```python
class User(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    password_hash: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
```

### Question Model  
```python
class Question(BaseModel):
    id: int
    question: str
    options: list[str]
    correct_answer: int
    category: str
    difficulty: str = "medium"
    created_at: datetime = Field(default_factory=datetime.utcnow)
```

### QuizResult Model
```python
class QuizResult(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    score: int
    total_questions: int
    correct_answers: int
    time_spent: int
    answers: dict  # {questionId: selectedAnswerIndex}
    completed_at: datetime = Field(default_factory=datetime.utcnow)
```

## Frontend Integration Changes

### Remove Mock Data
1. Replace `mockAPI.login()` calls with real API calls to `/api/auth/login`
2. Replace `mockAPI.signup()` calls with real API calls to `/api/auth/register`
3. Replace `mockAPI.getQuestions()` with real API calls to `/api/quiz/questions`
4. Replace `mockAPI.getUserData()` with real API calls to `/api/auth/me`

### Add API Service
Create `/frontend/src/services/api.js`:
```javascript
const API_BASE = process.env.REACT_APP_BACKEND_URL + '/api';

export const authAPI = {
  login: async (email, password) => {
    const response = await axios.post(`${API_BASE}/auth/login`, { email, password });
    return response.data;
  },
  register: async (name, email, password) => {
    const response = await axios.post(`${API_BASE}/auth/register`, { name, email, password });
    return response.data;
  },
  getMe: async (token) => {
    const response = await axios.get(`${API_BASE}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};

export const quizAPI = {
  getQuestions: async (token) => {
    const response = await axios.get(`${API_BASE}/quiz/questions`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },
  submitQuiz: async (token, answers, timeSpent) => {
    const response = await axios.post(`${API_BASE}/quiz/submit`, 
      { answers, timeSpent },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  }
};
```

## Security Requirements
1. **Password Hashing**: Use bcrypt for password hashing
2. **JWT Authentication**: Implement JWT token-based authentication
3. **Input Validation**: Validate all inputs on backend
4. **Rate Limiting**: Implement rate limiting for auth endpoints
5. **CORS**: Configure CORS properly for frontend domain

## Question Database Content
- Source questions from computer science and engineering aptitude tests
- Categories: Data Structures & Algorithms, OOP, Database Management, Computer Architecture, Computer Networks, Software Engineering
- Maintain minimum 50 questions in database for variety
- Include question difficulty levels (easy, medium, hard)

## Testing Scenarios
1. **User Registration**: New user creates account successfully
2. **User Login**: Existing user logs in with correct credentials  
3. **Invalid Login**: User login fails with wrong credentials
4. **Protected Routes**: Quiz access requires authentication
5. **Question Fetching**: Authenticated user gets 10 random questions
6. **Quiz Submission**: User submits answers and receives score
7. **Token Validation**: Invalid/expired tokens are rejected

## Error Handling
- **400 Bad Request**: Invalid input data
- **401 Unauthorized**: Missing or invalid authentication
- **404 Not Found**: Resource not found
- **409 Conflict**: Email already exists during registration
- **500 Internal Server Error**: Server errors

All error responses should follow format:
```json
{
  "error": "string",
  "message": "string",
  "details": "string (optional)"
}
```
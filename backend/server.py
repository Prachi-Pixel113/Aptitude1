from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Dict, Any
import uuid
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Quiz Models
class QuizAnswer(BaseModel):
    question_id: int
    selected_answer: int

class QuizSubmission(BaseModel):
    user_name: str
    user_email: str
    answers: Dict[str, int]  # question_id -> selected_answer_index
    time_taken: int  # in seconds
    total_questions: int

class QuizResult(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_name: str
    user_email: str
    answers: Dict[str, int]
    score: int
    total_questions: int
    percentage: int
    time_taken: int
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class QuizSubmissionResponse(BaseModel):
    success: bool
    message: str
    result: QuizResult

# Mock questions data (same as frontend)
MOCK_QUESTIONS = [
    {
        "id": 1,
        "question": "What is the time complexity of binary search algorithm?",
        "options": ["O(n)", "O(log n)", "O(n log n)", "O(n²)"],
        "correctAnswer": 1,
        "category": "Data Structures & Algorithms",
        "explanation": "Binary search divides the search space in half with each comparison, making it O(log n). It works by comparing the target with the middle element and eliminating half of the remaining elements."
    },
    {
        "id": 2,
        "question": "Which of the following is NOT a principle of Object-Oriented Programming?",
        "options": ["Encapsulation", "Inheritance", "Polymorphism", "Compilation"],
        "correctAnswer": 3,
        "category": "Object-Oriented Programming",
        "explanation": "Compilation is not a principle of OOP. The four main principles are Encapsulation (data hiding), Inheritance (deriving new classes), Polymorphism (multiple forms), and Abstraction (hiding complexity)."
    },
    {
        "id": 3,
        "question": "In a relational database, what does ACID stand for?",
        "options": [
            "Atomicity, Consistency, Isolation, Durability",
            "Association, Consistency, Isolation, Dependency",
            "Atomicity, Concurrency, Isolation, Durability",
            "Association, Concurrency, Integration, Dependency"
        ],
        "correctAnswer": 0,
        "category": "Database Management",
        "explanation": "ACID stands for Atomicity (all or nothing), Consistency (valid state), Isolation (concurrent transactions don't interfere), and Durability (committed changes persist). These properties ensure reliable database transactions."
    },
    {
        "id": 4,
        "question": "What is the purpose of a constructor in a class?",
        "options": [
            "To destroy objects",
            "To initialize objects",
            "To copy objects",
            "To compare objects"
        ],
        "correctAnswer": 1,
        "category": "Object-Oriented Programming",
        "explanation": "A constructor is a special method that initializes objects when they are created. It sets initial values for object attributes and performs any setup required for the object to function properly."
    },
    {
        "id": 5,
        "question": "Which sorting algorithm has the best average-case time complexity?",
        "options": ["Bubble Sort", "Selection Sort", "Merge Sort", "Insertion Sort"],
        "correctAnswer": 2,
        "category": "Data Structures & Algorithms",
        "explanation": "Merge Sort has O(n log n) average-case complexity, which is optimal for comparison-based sorting. Bubble Sort, Selection Sort, and Insertion Sort all have O(n²) average-case complexity."
    },
    {
        "id": 6,
        "question": "What does CPU stand for?",
        "options": [
            "Computer Processing Unit",
            "Central Processing Unit",
            "Core Processing Unit",
            "Central Program Unit"
        ],
        "correctAnswer": 1,
        "category": "Computer Architecture",
        "explanation": "CPU stands for Central Processing Unit. It's the primary component of a computer that performs most of the processing inside the computer by executing instructions of computer programs."
    },
    {
        "id": 7,
        "question": "In networking, what does HTTP stand for?",
        "options": [
            "HyperText Transfer Protocol",
            "HyperText Transmission Protocol",
            "HyperText Transport Protocol",
            "HyperText Transfer Process"
        ],
        "correctAnswer": 0,
        "category": "Computer Networks",
        "explanation": "HTTP stands for HyperText Transfer Protocol. It's an application-layer protocol used for transmitting hypermedia documents, such as HTML, and is the foundation of data communication on the World Wide Web."
    },
    {
        "id": 8,
        "question": "Which of the following is a non-volatile memory?",
        "options": ["RAM", "Cache", "ROM", "Register"],
        "correctAnswer": 2,
        "category": "Computer Architecture",
        "explanation": "ROM (Read-Only Memory) is non-volatile memory that retains data even when power is removed. RAM, Cache, and Registers are volatile memories that lose their contents when power is turned off."
    },
    {
        "id": 9,
        "question": "What is the main advantage of using a linked list over an array?",
        "options": [
            "Random access",
            "Dynamic size",
            "Better cache performance",
            "Less memory usage"
        ],
        "correctAnswer": 1,
        "category": "Data Structures & Algorithms",
        "explanation": "Linked lists have dynamic size, allowing insertion and deletion without declaring a fixed size beforehand. Arrays have fixed size and better cache performance, but linked lists provide flexibility in memory allocation."
    },
    {
        "id": 10,
        "question": "In software engineering, what does DRY principle stand for?",
        "options": [
            "Don't Repeat Yourself",
            "Do Repeat Yourself",
            "Don't Rely Yourself",
            "Do Rely Yourself"
        ],
        "correctAnswer": 0,
        "category": "Software Engineering",
        "explanation": "DRY stands for 'Don't Repeat Yourself'. It's a principle aimed at reducing repetition of software patterns and code duplication. Instead, use abstractions and avoid redundant code to improve maintainability."
    }
]

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

def calculate_quiz_score(answers: Dict[str, int]) -> int:
    """Calculate the quiz score based on user answers"""
    score = 0
    for question in MOCK_QUESTIONS:
        question_id_str = str(question["id"])
        if question_id_str in answers:
            user_answer = answers[question_id_str]
            if user_answer == question["correctAnswer"]:
                score += 1
    return score

@api_router.post("/quiz/submit", response_model=QuizSubmissionResponse)
async def submit_quiz(submission: QuizSubmission):
    try:
        # Calculate score
        score = calculate_quiz_score(submission.answers)
        percentage = round((score / submission.total_questions) * 100)
        
        # Create quiz result object
        quiz_result = QuizResult(
            user_name=submission.user_name,
            user_email=submission.user_email,
            answers=submission.answers,
            score=score,
            total_questions=submission.total_questions,
            percentage=percentage,
            time_taken=submission.time_taken
        )
        
        # Store in database
        result_dict = quiz_result.dict()
        await db.quiz_results.insert_one(result_dict)
        
        logger.info(f"Quiz submitted successfully for user: {submission.user_name}, Score: {score}/{submission.total_questions}")
        
        return QuizSubmissionResponse(
            success=True,
            message="Quiz submitted successfully",
            result=quiz_result
        )
        
    except Exception as e:
        logger.error(f"Error submitting quiz: {str(e)}")
        # Return error response but still with proper structure
        error_result = QuizResult(
            user_name=submission.user_name,
            user_email=submission.user_email,
            answers=submission.answers,
            score=0,
            total_questions=submission.total_questions,
            percentage=0,
            time_taken=submission.time_taken
        )
        return QuizSubmissionResponse(
            success=False,
            message=f"Error submitting quiz: {str(e)}",
            result=error_result
        )

@api_router.get("/quiz/questions")
async def get_quiz_questions():
    """Get all quiz questions"""
    try:
        logger.info("Quiz questions requested")
        return {"success": True, "questions": MOCK_QUESTIONS}
    except Exception as e:
        logger.error(f"Error fetching questions: {str(e)}")
        return {"success": False, "error": str(e), "questions": []}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

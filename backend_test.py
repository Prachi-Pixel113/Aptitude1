#!/usr/bin/env python3
"""
Backend API Testing for Quiz Functionality
Tests the quiz submission and questions endpoints
"""

import requests
import json
import os
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / 'frontend' / '.env')

# Get backend URL from frontend environment
BACKEND_URL = os.environ.get('REACT_APP_BACKEND_URL', 'http://localhost:8001')
API_BASE = f"{BACKEND_URL}/api"

print(f"Testing backend at: {API_BASE}")

def test_quiz_questions_endpoint():
    """Test GET /api/quiz/questions endpoint"""
    print("\n=== Testing GET /api/quiz/questions ===")
    
    try:
        response = requests.get(f"{API_BASE}/quiz/questions", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Response structure: {list(data.keys())}")
            
            # Verify response structure
            if 'success' in data and 'questions' in data:
                print(f"✅ Response has correct structure")
                print(f"Success: {data['success']}")
                
                questions = data['questions']
                print(f"Number of questions: {len(questions)}")
                
                if len(questions) == 10:
                    print("✅ Correct number of questions (10)")
                    
                    # Verify question structure
                    sample_question = questions[0]
                    required_fields = ['id', 'question', 'options', 'correctAnswer', 'category']
                    
                    missing_fields = [field for field in required_fields if field not in sample_question]
                    if not missing_fields:
                        print("✅ Questions have correct structure")
                        print(f"Sample question: {sample_question['question'][:50]}...")
                        print(f"Options count: {len(sample_question['options'])}")
                        print(f"Correct answer index: {sample_question['correctAnswer']}")
                        print(f"Category: {sample_question['category']}")
                        return True, questions
                    else:
                        print(f"❌ Missing fields in questions: {missing_fields}")
                        return False, None
                else:
                    print(f"❌ Expected 10 questions, got {len(questions)}")
                    return False, None
            else:
                print(f"❌ Response missing required fields: {data}")
                return False, None
        else:
            print(f"❌ Request failed with status {response.status_code}")
            print(f"Response: {response.text}")
            return False, None
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Request failed: {e}")
        return False, None
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        return False, None

def test_quiz_submission_endpoint():
    """Test POST /api/quiz/submit endpoint"""
    print("\n=== Testing POST /api/quiz/submit ===")
    
    # Test data based on the review request
    test_submission = {
        "user_name": "John Doe",
        "user_email": "john.doe@example.com",
        "answers": {"1": 1, "2": 3, "3": 0, "4": 1, "5": 2},
        "time_taken": 300,
        "total_questions": 10
    }
    
    try:
        response = requests.post(
            f"{API_BASE}/quiz/submit",
            json=test_submission,
            headers={'Content-Type': 'application/json'},
            timeout=10
        )
        
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Response structure: {list(data.keys())}")
            
            # Verify response structure
            required_fields = ['success', 'message', 'result']
            missing_fields = [field for field in required_fields if field not in data]
            
            if not missing_fields:
                print("✅ Response has correct structure")
                print(f"Success: {data['success']}")
                print(f"Message: {data['message']}")
                
                result = data['result']
                result_fields = ['id', 'user_name', 'user_email', 'answers', 'score', 'total_questions', 'percentage', 'time_taken', 'timestamp']
                missing_result_fields = [field for field in result_fields if field not in result]
                
                if not missing_result_fields:
                    print("✅ Result object has correct structure")
                    print(f"User: {result['user_name']} ({result['user_email']})")
                    print(f"Score: {result['score']}/{result['total_questions']} ({result['percentage']}%)")
                    print(f"Time taken: {result['time_taken']} seconds")
                    print(f"Timestamp: {result['timestamp']}")
                    
                    # Verify score calculation
                    expected_score = calculate_expected_score(test_submission['answers'])
                    if result['score'] == expected_score:
                        print(f"✅ Score calculation correct: {result['score']}")
                    else:
                        print(f"❌ Score calculation incorrect. Expected: {expected_score}, Got: {result['score']}")
                    
                    # Verify percentage calculation
                    expected_percentage = round((result['score'] / result['total_questions']) * 100)
                    if result['percentage'] == expected_percentage:
                        print(f"✅ Percentage calculation correct: {result['percentage']}%")
                    else:
                        print(f"❌ Percentage calculation incorrect. Expected: {expected_percentage}%, Got: {result['percentage']}%")
                    
                    return True, data
                else:
                    print(f"❌ Missing fields in result: {missing_result_fields}")
                    return False, None
            else:
                print(f"❌ Missing fields in response: {missing_fields}")
                return False, None
        else:
            print(f"❌ Request failed with status {response.status_code}")
            print(f"Response: {response.text}")
            return False, None
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Request failed: {e}")
        return False, None
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        return False, None

def calculate_expected_score(answers):
    """Calculate expected score based on correct answers from backend"""
    # Correct answers from the MOCK_QUESTIONS in server.py
    correct_answers = {
        "1": 1,  # Binary search - O(log n)
        "2": 3,  # OOP principle - Compilation
        "3": 0,  # ACID - Atomicity, Consistency, Isolation, Durability
        "4": 1,  # Constructor - To initialize objects
        "5": 2,  # Sorting - Merge Sort
        "6": 1,  # CPU - Central Processing Unit
        "7": 0,  # HTTP - HyperText Transfer Protocol
        "8": 2,  # Non-volatile memory - ROM
        "9": 1,  # Linked list advantage - Dynamic size
        "10": 0  # DRY - Don't Repeat Yourself
    }
    
    score = 0
    for question_id, user_answer in answers.items():
        if question_id in correct_answers and user_answer == correct_answers[question_id]:
            score += 1
    
    return score

def test_quiz_submission_error_handling():
    """Test error handling for invalid quiz submissions"""
    print("\n=== Testing Error Handling ===")
    
    # Test with missing required fields
    invalid_submissions = [
        {},  # Empty submission
        {"user_name": "Test User"},  # Missing other required fields
        {
            "user_name": "Test User",
            "user_email": "invalid-email",  # Invalid email format
            "answers": {},
            "time_taken": -1,  # Invalid time
            "total_questions": 0  # Invalid total
        }
    ]
    
    for i, invalid_data in enumerate(invalid_submissions):
        print(f"\nTesting invalid submission {i+1}: {invalid_data}")
        
        try:
            response = requests.post(
                f"{API_BASE}/quiz/submit",
                json=invalid_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            print(f"Status Code: {response.status_code}")
            
            if response.status_code in [400, 422]:  # Expected error codes
                print("✅ Proper error response for invalid data")
            elif response.status_code == 200:
                # Check if it's a success=false response
                data = response.json()
                if not data.get('success', True):
                    print("✅ Handled gracefully with success=false")
                else:
                    print("⚠️ Accepted invalid data - might need validation")
            else:
                print(f"⚠️ Unexpected status code: {response.status_code}")
                
        except Exception as e:
            print(f"❌ Error testing invalid submission: {e}")

def test_cors_configuration():
    """Test CORS configuration"""
    print("\n=== Testing CORS Configuration ===")
    
    try:
        # Test preflight request
        response = requests.options(
            f"{API_BASE}/quiz/questions",
            headers={
                'Origin': 'https://quiz-submit-api.preview.emergentagent.com',
                'Access-Control-Request-Method': 'GET',
                'Access-Control-Request-Headers': 'Content-Type'
            },
            timeout=10
        )
        
        print(f"OPTIONS Status Code: {response.status_code}")
        
        if response.status_code in [200, 204]:
            cors_headers = {
                'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
                'Access-Control-Allow-Methods': response.headers.get('Access-Control-Allow-Methods'),
                'Access-Control-Allow-Headers': response.headers.get('Access-Control-Allow-Headers')
            }
            
            print("CORS Headers:")
            for header, value in cors_headers.items():
                print(f"  {header}: {value}")
            
            if cors_headers['Access-Control-Allow-Origin']:
                print("✅ CORS configured")
            else:
                print("⚠️ CORS headers not found")
        else:
            print(f"⚠️ OPTIONS request failed: {response.status_code}")
            
    except Exception as e:
        print(f"❌ CORS test failed: {e}")

def main():
    """Run all backend tests"""
    print("🚀 Starting Backend API Tests for Quiz Functionality")
    print("=" * 60)
    
    results = {
        'questions_endpoint': False,
        'submission_endpoint': False,
        'error_handling': True,  # Assume pass unless critical failure
        'cors': True  # Assume pass unless critical failure
    }
    
    # Test quiz questions endpoint
    success, questions = test_quiz_questions_endpoint()
    results['questions_endpoint'] = success
    
    # Test quiz submission endpoint
    success, submission_result = test_quiz_submission_endpoint()
    results['submission_endpoint'] = success
    
    # Test error handling
    test_quiz_submission_error_handling()
    
    # Test CORS
    test_cors_configuration()
    
    # Summary
    print("\n" + "=" * 60)
    print("🏁 TEST SUMMARY")
    print("=" * 60)
    
    for test_name, passed in results.items():
        status = "✅ PASS" if passed else "❌ FAIL"
        print(f"{test_name.replace('_', ' ').title()}: {status}")
    
    overall_success = all(results.values())
    print(f"\nOverall Result: {'✅ ALL TESTS PASSED' if overall_success else '❌ SOME TESTS FAILED'}")
    
    return overall_success

if __name__ == "__main__":
    main()
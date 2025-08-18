import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Clock, ChevronRight, ChevronLeft, RotateCcw, LogOut } from 'lucide-react';
import { mockAPI } from '../mock';

const QuizPage = ({ user, onLogout }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 minutes in seconds
  const [loading, setLoading] = useState(true);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/quiz/questions`);
        const data = await response.json();
        
        if (data.success) {
          setQuestions(data.questions);
        } else {
          console.error('Failed to fetch questions:', data.error);
          // Fallback to mock data if API fails
          const questionsData = await mockAPI.getQuestions();
          setQuestions(questionsData);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
        // Fallback to mock data if API fails
        try {
          const questionsData = await mockAPI.getQuestions();
          setQuestions(questionsData);
        } catch (fallbackError) {
          console.error('Fallback also failed:', fallbackError);
        }
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (loading || quizCompleted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleQuizComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [loading, quizCompleted]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerIndex
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleQuizComplete = async () => {
    setSubmitting(true);
    setSubmitError(null);
    
    try {
      // Calculate time taken (initial time was 20 minutes = 1200 seconds)
      const timeTaken = 1200 - timeLeft;
      
      // Prepare submission data
      const submissionData = {
        user_name: user.name,
        user_email: user.email,
        answers: selectedAnswers,
        time_taken: timeTaken,
        total_questions: questions.length
      };
      
      // Submit to backend
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/quiz/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        setScore(data.result.score);
        setQuizCompleted(true);
        console.log('Quiz submitted successfully:', data);
      } else {
        throw new Error(data.message || 'Failed to submit quiz');
      }
      
    } catch (error) {
      console.error('Error submitting quiz:', error);
      setSubmitError(error.message);
      
      // Fallback to local calculation if API fails
      let correctCount = 0;
      questions.forEach((question) => {
        if (selectedAnswers[question.id] === question.correctAnswer) {
          correctCount++;
        }
      });
      setScore(correctCount);
      setQuizCompleted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setTimeLeft(20 * 60);
    setQuizCompleted(false);
    setScore(0);
    setSubmitting(false);
    setSubmitError(null);
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        background: 'var(--bg-page)'
      }}>
        <div className="body-large">Loading questions...</div>
      </div>
    );
  }

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div style={{ minHeight: '100vh', background: 'var(--gradient-hero)', padding: '2rem' }}>
        <div className="container" style={{ maxWidth: '600px', textAlign: 'center' }}>
          <div className="product-card">
            <div style={{ marginBottom: '2rem' }}>
              <Brain size={64} style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }} />
              <h1 className="heading-2" style={{ marginBottom: '1rem' }}>Quiz Complete!</h1>
              <p className="body-large" style={{ color: 'var(--text-secondary)' }}>
                Great job, {user.name}! Here are your results:
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              <div className="product-card" style={{ textAlign: 'center' }}>
                <div className="heading-2" style={{ color: 'var(--accent-text)', margin: '0 0 0.5rem 0' }}>
                  {score}/{questions.length}
                </div>
                <div className="body-small">Correct Answers</div>
              </div>
              <div className="product-card" style={{ textAlign: 'center' }}>
                <div className="heading-2" style={{ color: 'var(--accent-text)', margin: '0 0 0.5rem 0' }}>
                  {percentage}%
                </div>
                <div className="body-small">Score</div>
              </div>
            </div>

            <div style={{ 
              padding: '1rem', 
              backgroundColor: percentage >= 70 ? 'var(--accent-wash)' : '#fee2e2', 
              border: `1px solid ${percentage >= 70 ? 'var(--accent-primary)' : '#fecaca'}`,
              borderRadius: '8px',
              marginBottom: '2rem'
            }}>
              <p className="body-medium" style={{ margin: 0, color: percentage >= 70 ? 'var(--accent-text)' : '#dc2626' }}>
                {percentage >= 70 
                  ? '🎉 Excellent! You have a strong grasp of the concepts.'
                  : percentage >= 50
                  ? '👍 Good effort! Consider reviewing the topics you missed.'
                  : '📚 Keep practicing! Focus on understanding the fundamentals.'
                }
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={handleRestart} className="btn-primary">
                <RotateCcw size={18} style={{ marginRight: '0.5rem' }} />
                Try Again
              </button>
              <Link to="/" className="btn-secondary">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-page)' }}>
      {/* Header */}
      <header style={{ 
        padding: '1rem 0', 
        borderBottom: '1px solid var(--border-light)',
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(8px)',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <Brain className="text-accent-primary" size={24} />
            <span className="heading-3" style={{ margin: 0, color: 'var(--accent-text)' }}>TriApt</span>
          </Link>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={18} style={{ color: 'var(--accent-primary)' }} />
              <span className="body-medium" style={{ fontWeight: '600', color: timeLeft < 300 ? '#dc2626' : 'var(--text-primary)' }}>
                {formatTime(timeLeft)}
              </span>
            </div>
            
            <div className="body-small" style={{ color: 'var(--text-secondary)' }}>
              Welcome, {user.name}
            </div>
            
            <button onClick={onLogout} className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Quiz Content */}
      <div className="quiz-container">
        {/* Progress Bar */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span className="body-small">Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span className="body-small">{currentQuestion?.category}</span>
          </div>
          <div style={{ 
            width: '100%', 
            height: '8px', 
            backgroundColor: 'var(--border-light)', 
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div style={{ 
              width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`, 
              height: '100%', 
              background: 'var(--gradient-button)',
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>

        {/* Question Card */}
        <div className="question-card">
          <h2 className="heading-3" style={{ marginBottom: '2rem' }}>
            {currentQuestion?.question}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {currentQuestion?.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(currentQuestion.id, index)}
                className={`option-button ${selectedAnswers[currentQuestion.id] === index ? 'selected' : ''}`}
                style={{
                  backgroundColor: selectedAnswers[currentQuestion.id] === index ? 'var(--accent-wash)' : 'var(--bg-card)',
                  borderColor: selectedAnswers[currentQuestion.id] === index ? 'var(--accent-primary)' : 'var(--border-light)',
                  color: selectedAnswers[currentQuestion.id] === index ? 'var(--accent-text)' : 'var(--text-body)'
                }}
              >
                <span style={{ fontWeight: '600', marginRight: '0.75rem' }}>
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginTop: '2rem'
        }}>
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="btn-secondary"
            style={{ 
              opacity: currentQuestionIndex === 0 ? 0.5 : 1,
              cursor: currentQuestionIndex === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            <ChevronLeft size={18} style={{ marginRight: '0.5rem' }} />
            Previous
          </button>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {questions.map((_, index) => (
              <div
                key={index}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: index === currentQuestionIndex 
                    ? 'var(--accent-primary)' 
                    : selectedAnswers[questions[index]?.id] !== undefined 
                    ? 'var(--accent-strong)' 
                    : 'var(--border-light)'
                }}
              />
            ))}
          </div>

          {currentQuestionIndex === questions.length - 1 ? (
            <button
              onClick={handleQuizComplete}
              className="btn-primary"
              disabled={selectedAnswers[currentQuestion?.id] === undefined}
              style={{
                opacity: selectedAnswers[currentQuestion?.id] === undefined ? 0.5 : 1,
                cursor: selectedAnswers[currentQuestion?.id] === undefined ? 'not-allowed' : 'pointer'
              }}
            >
              Complete Quiz
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={selectedAnswers[currentQuestion?.id] === undefined}
              className="btn-primary"
              style={{
                opacity: selectedAnswers[currentQuestion?.id] === undefined ? 0.5 : 1,
                cursor: selectedAnswers[currentQuestion?.id] === undefined ? 'not-allowed' : 'pointer'
              }}
            >
              Next
              <ChevronRight size={18} style={{ marginLeft: '0.5rem' }} />
            </button>
          )}
        </div>

        {/* Answer Summary */}
        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: 'var(--bg-section)', borderRadius: '8px' }}>
          <p className="body-small" style={{ color: 'var(--text-secondary)', margin: '0 0 0.5rem 0' }}>
            Progress: {Object.keys(selectedAnswers).length} of {questions.length} questions answered
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {questions.map((question, index) => (
              <button
                key={question.id}
                onClick={() => setCurrentQuestionIndex(index)}
                style={{
                  padding: '0.5rem',
                  minWidth: '40px',
                  borderRadius: '6px',
                  border: '1px solid var(--border-light)',
                  backgroundColor: index === currentQuestionIndex 
                    ? 'var(--accent-primary)' 
                    : selectedAnswers[question.id] !== undefined 
                    ? 'var(--accent-wash)' 
                    : 'var(--bg-card)',
                  color: index === currentQuestionIndex ? 'white' : 'var(--text-body)',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
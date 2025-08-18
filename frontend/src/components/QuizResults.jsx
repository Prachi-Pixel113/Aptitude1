import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Clock, CheckCircle, XCircle, RotateCcw, Home, Trophy, Target } from 'lucide-react';

const QuizResults = ({ user, onLogout, results, onRestart }) => {
  const { score, total_questions, percentage, time_taken, detailed_results } = results;

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return '#22c55e'; // Green
    if (percentage >= 60) return '#f59e0b'; // Orange
    return '#ef4444'; // Red
  };

  const getScoreMessage = (percentage) => {
    if (percentage >= 80) return '🎉 Excellent! Outstanding performance!';
    if (percentage >= 60) return '👍 Good job! Room for improvement.';
    return '📚 Keep practicing! You can do better.';
  };

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
            <div className="body-small" style={{ color: 'var(--text-secondary)' }}>
              {user.name} - Quiz Results
            </div>
            
            <button onClick={onLogout} className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Results Content */}
      <div className="quiz-container">
        {/* Score Summary */}
        <div style={{ 
          backgroundColor: 'var(--bg-card)',
          borderRadius: '16px',
          padding: '2rem',
          marginBottom: '2rem',
          border: '1px solid var(--border-light)',
          textAlign: 'center'
        }}>
          <Trophy size={48} style={{ color: getScoreColor(percentage), marginBottom: '1rem' }} />
          <h1 className="heading-2" style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
            Quiz Completed!
          </h1>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
            gap: '1rem', 
            marginBottom: '2rem' 
          }}>
            <div style={{ 
              padding: '1rem', 
              backgroundColor: 'var(--bg-section)', 
              borderRadius: '12px',
              border: `2px solid ${getScoreColor(percentage)}`,
            }}>
              <div style={{ 
                fontSize: '2rem', 
                fontWeight: 'bold', 
                color: getScoreColor(percentage),
                marginBottom: '0.5rem'
              }}>
                {score}/{total_questions}
              </div>
              <div className="body-small" style={{ color: 'var(--text-secondary)' }}>Score</div>
            </div>
            
            <div style={{ 
              padding: '1rem', 
              backgroundColor: 'var(--bg-section)', 
              borderRadius: '12px' 
            }}>
              <div style={{ 
                fontSize: '2rem', 
                fontWeight: 'bold', 
                color: getScoreColor(percentage),
                marginBottom: '0.5rem'
              }}>
                {percentage}%
              </div>
              <div className="body-small" style={{ color: 'var(--text-secondary)' }}>Percentage</div>
            </div>
            
            <div style={{ 
              padding: '1rem', 
              backgroundColor: 'var(--bg-section)', 
              borderRadius: '12px' 
            }}>
              <div style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                color: 'var(--text-primary)',
                marginBottom: '0.5rem'
              }}>
                {formatTime(time_taken)}
              </div>
              <div className="body-small" style={{ color: 'var(--text-secondary)' }}>Time Taken</div>
            </div>
          </div>

          <div style={{ 
            padding: '1rem', 
            backgroundColor: percentage >= 70 ? '#dcfce7' : '#fee2e2', 
            border: `1px solid ${percentage >= 70 ? '#22c55e' : '#ef4444'}`,
            borderRadius: '8px',
            marginBottom: '1rem'
          }}>
            <p className="body-medium" style={{ 
              margin: 0, 
              color: percentage >= 70 ? '#15803d' : '#dc2626',
              fontWeight: '600'
            }}>
              {getScoreMessage(percentage)}
            </p>
          </div>
        </div>

        {/* Question Analysis */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 className="heading-3" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Target size={24} />
            Detailed Analysis
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {detailed_results.map((result, index) => (
              <div
                key={result.question_id}
                style={{ 
                  backgroundColor: 'var(--bg-card)',
                  border: `2px solid ${result.is_correct ? '#22c55e' : '#ef4444'}`,
                  borderRadius: '12px',
                  padding: '1.5rem',
                  position: 'relative'
                }}
              >
                {/* Question Header */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start',
                  marginBottom: '1rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ 
                      width: '32px', 
                      height: '32px', 
                      borderRadius: '50%', 
                      backgroundColor: result.is_correct ? '#22c55e' : '#ef4444',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold'
                    }}>
                      {index + 1}
                    </div>
                    <span className="body-small" style={{ 
                      color: 'var(--text-secondary)',
                      backgroundColor: 'var(--bg-section)',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '12px'
                    }}>
                      {result.category}
                    </span>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {result.is_correct ? (
                      <>
                        <CheckCircle size={24} style={{ color: '#22c55e' }} />
                        <span className="body-small" style={{ color: '#22c55e', fontWeight: '600' }}>
                          Correct
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle size={24} style={{ color: '#ef4444' }} />
                        <span className="body-small" style={{ color: '#ef4444', fontWeight: '600' }}>
                          Incorrect
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Question */}
                <h3 className="body-large" style={{ 
                  marginBottom: '1rem', 
                  fontWeight: '600',
                  color: 'var(--text-primary)'
                }}>
                  {result.question}
                </h3>

                {/* Options */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                  {result.options.map((option, optionIndex) => {
                    const isUserAnswer = result.user_answer === optionIndex;
                    const isCorrectAnswer = result.correct_answer === optionIndex;
                    
                    let backgroundColor = 'var(--bg-section)';
                    let borderColor = 'var(--border-light)';
                    let textColor = 'var(--text-body)';
                    
                    if (isCorrectAnswer) {
                      backgroundColor = '#dcfce7';
                      borderColor = '#22c55e';
                      textColor = '#15803d';
                    } else if (isUserAnswer && !result.is_correct) {
                      backgroundColor = '#fee2e2';
                      borderColor = '#ef4444';
                      textColor = '#dc2626';
                    }
                    
                    return (
                      <div
                        key={optionIndex}
                        style={{
                          padding: '0.75rem',
                          backgroundColor,
                          border: `2px solid ${borderColor}`,
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem'
                        }}
                      >
                        <span style={{ 
                          fontWeight: '600',
                          color: textColor
                        }}>
                          {String.fromCharCode(65 + optionIndex)}.
                        </span>
                        <span className="body-medium" style={{ color: textColor }}>
                          {option}
                        </span>
                        {isCorrectAnswer && (
                          <CheckCircle size={18} style={{ color: '#22c55e', marginLeft: 'auto' }} />
                        )}
                        {isUserAnswer && !result.is_correct && (
                          <XCircle size={18} style={{ color: '#ef4444', marginLeft: 'auto' }} />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                <div style={{ 
                  padding: '1rem',
                  backgroundColor: '#f8fafc',
                  borderRadius: '8px',
                  borderLeft: '4px solid var(--accent-primary)'
                }}>
                  <h4 className="body-medium" style={{ 
                    fontWeight: '600', 
                    marginBottom: '0.5rem',
                    color: 'var(--accent-text)'
                  }}>
                    Explanation:
                  </h4>
                  <p className="body-small" style={{ 
                    margin: 0,
                    color: 'var(--text-secondary)',
                    lineHeight: '1.6'
                  }}>
                    {result.explanation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '1rem',
          marginTop: '2rem',
          paddingBottom: '2rem'
        }}>
          <Link to="/" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Home size={18} />
            Back to Home
          </Link>
          <button 
            onClick={onRestart} 
            className="btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <RotateCcw size={18} />
            Take Quiz Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
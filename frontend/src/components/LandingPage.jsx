import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Brain, Users, CheckCircle, MessageCircle, X } from 'lucide-react';
import { mockFAQs, randomTriAptQuestions, randomTriAptFacts, chatbotEngagementResponses, fallbackResponses } from '../mock';

const LandingPage = ({ user, onLogout }) => {
  const [enrollmentDeadline] = useState(new Date('2025-02-15T23:59:59'));
  const [timeLeft, setTimeLeft] = useState({});
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', text: 'Hey there! 👋 I\'m your TriApt Assistant! I love sharing cool facts about our platform and asking questions to help you discover what makes TriApt awesome. Just type anything to get started!' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [openFAQ, setOpenFAQ] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = enrollmentDeadline.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [enrollmentDeadline]);

  const handleChatToggle = () => {
    setChatOpen(!chatOpen);
    
    // Send a random question or fact when chat is opened for the first time after closing
    if (!chatOpen && chatMessages.length === 1) {
      setTimeout(() => {
        const shouldAskQuestion = Math.random() < 0.6; // 60% chance to ask question
        
        if (shouldAskQuestion) {
          const randomQuestion = randomTriAptQuestions[Math.floor(Math.random() * randomTriAptQuestions.length)];
          setChatMessages(prev => [...prev, { type: 'bot', text: randomQuestion }]);
        } else {
          const randomFact = randomTriAptFacts[Math.floor(Math.random() * randomTriAptFacts.length)];
          setChatMessages(prev => [...prev, { type: 'bot', text: randomFact }]);
        }
      }, 1500);
    }
  };

  const handleChatSend = () => {
    if (!chatInput.trim()) return;

    const userMessage = chatInput.trim();
    setChatMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setChatInput('');

    setTimeout(() => {
      // Randomly choose what type of response to give
      const responseType = Math.floor(Math.random() * 4); // 0, 1, 2, or 3
      
      let botResponse = '';
      
      if (responseType === 0) {
        // Ask a random question
        const randomQuestion = randomTriAptQuestions[Math.floor(Math.random() * randomTriAptQuestions.length)];
        botResponse = randomQuestion;
      } else if (responseType === 1) {
        // Share a random fact
        const randomFact = randomTriAptFacts[Math.floor(Math.random() * randomTriAptFacts.length)];
        botResponse = randomFact;
      } else if (responseType === 2) {
        // Engagement response + random fact
        const engagement = chatbotEngagementResponses[Math.floor(Math.random() * chatbotEngagementResponses.length)];
        const randomFact = randomTriAptFacts[Math.floor(Math.random() * randomTriAptFacts.length)];
        botResponse = `${engagement} ${randomFact}`;
      } else {
        // Engagement response + random question
        const engagement = chatbotEngagementResponses[Math.floor(Math.random() * chatbotEngagementResponses.length)];
        const randomQuestion = randomTriAptQuestions[Math.floor(Math.random() * randomTriAptQuestions.length)];
        botResponse = `${engagement} ${randomQuestion}`;
      }
      
      setChatMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
    }, 500);
  };

  return (
    <div>
      {/* Navigation Header */}
      <header className="nav-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Brain className="text-accent-primary" size={24} />
          <span className="heading-3" style={{ margin: 0, color: 'var(--accent-text)' }}>TriApt</span>
        </div>
        <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <a href="#features" className="nav-link">Features</a>
          <a href="#faq" className="nav-link">FAQ</a>
          {user ? (
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <span className="body-small">Welcome, {user.name}</span>
              <Link to="/Quiz" className="btn-primary">Take Quiz</Link>
              <button onClick={onLogout} className="nav-link">Logout</button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="btn-primary">Get Started</Link>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="heading-1" style={{ marginBottom: '1.5rem' }}>
            Master Computer Science & Engineering Concepts with TriApt
          </h1>
          <p className="body-large" style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
            Free, comprehensive aptitude tests designed for CS & Engineering students. 
            Practice with real-world questions and boost your technical interview skills.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {user ? (
              <Link to="/quiz" className="btn-primary">Start Quiz Now</Link>
            ) : (
              <>
                <Link to="/signup" className="btn-primary">Start Free Quiz</Link>
                <Link to="/login" className="btn-secondary">Already have account?</Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Enrollment Countdown */}
      <section className="pad-xl" style={{ background: 'var(--bg-section)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="heading-2" style={{ marginBottom: '1rem' }}>Free Access Ends Soon!</h2>
          <p className="body-medium" style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
            Don't miss out on our premium question bank - completely free until Feb 15th
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="product-card" style={{ textAlign: 'center', minWidth: '100px' }}>
                <div className="heading-2" style={{ color: 'var(--accent-text)', margin: 0 }}>
                  {value || 0}
                </div>
                <div className="body-small" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {unit}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="pad-xl">
        <div className="container">
          <h2 className="heading-2" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            Why Choose TriApt?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div className="product-card">
              <CheckCircle size={48} style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }} />
              <h3 className="heading-3" style={{ marginBottom: '1rem' }}>100% Free</h3>
              <p className="body-medium">
                No hidden costs, no subscriptions. Quality engineering aptitude questions accessible to everyone.
              </p>
            </div>
            <div className="product-card">
              <Brain size={48} style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }} />
              <h3 className="heading-3" style={{ marginBottom: '1rem' }}>Expert-Curated</h3>
              <p className="body-medium">
                Questions sourced from top engineering resources and real interview experiences.
              </p>
            </div>
            <div className="product-card">
              <Clock size={48} style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }} />
              <h3 className="heading-3" style={{ marginBottom: '1rem' }}>Quick Practice</h3>
              <p className="body-medium">
                10 focused questions per session. Perfect for daily practice and skill building.
              </p>
            </div>
            <div className="product-card">
              <Users size={48} style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }} />
              <h3 className="heading-3" style={{ marginBottom: '1rem' }}>Track Progress</h3>
              <p className="body-medium">
                Monitor your improvement across different CS & Engineering topics over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Preview */}
      <section className="pad-xl" style={{ background: 'var(--bg-section)' }}>
        <div className="container">
          <h2 className="heading-2" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            Sample Question Preview
          </h2>
          <div className="product-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h3 className="heading-3" style={{ marginBottom: '1.5rem' }}>
              What is the time complexity of binary search algorithm?
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['O(n)', 'O(log n)', 'O(n log n)', 'O(n²)'].map((option, index) => (
                <button
                  key={index}
                  className="option-button"
                  style={{ 
                    backgroundColor: index === 1 ? 'var(--accent-wash)' : 'var(--bg-card)',
                    borderColor: index === 1 ? 'var(--accent-primary)' : 'var(--border-light)'
                  }}
                >
                  {String.fromCharCode(65 + index)}. {option}
                </button>
              ))}
            </div>
            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <p className="body-small" style={{ color: 'var(--accent-text)' }}>
                ✓ Correct! Binary search has O(log n) time complexity.
              </p>
              {!user && (
                <Link to="/signup" className="btn-primary" style={{ marginTop: '1rem' }}>
                  Try More Questions
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="pad-xl">
        <div className="container">
          <h2 className="heading-2" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            Frequently Asked Questions
          </h2>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {mockFAQs.map((faq) => (
              <div key={faq.id} className="product-card" style={{ marginBottom: '1rem' }}>
                <button
                  onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <h3 className="heading-3" style={{ margin: 0 }}>{faq.question}</h3>
                  <span style={{ fontSize: '1.5rem', color: 'var(--accent-primary)' }}>
                    {openFAQ === faq.id ? '−' : '+'}
                  </span>
                </button>
                {openFAQ === faq.id && (
                  <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
                    <p className="body-medium">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pad-xl" style={{ background: 'var(--accent-text)', color: 'white' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Brain size={24} style={{ color: 'var(--accent-primary)' }} />
            <span className="heading-3" style={{ margin: 0, color: 'var(--accent-primary)' }}>TriApt</span>
          </div>
          <p className="body-medium" style={{ marginBottom: '1rem' }}>
            Free Computer Science & Engineering Aptitude Tests for Everyone
          </p>
          <p className="body-small" style={{ opacity: 0.7 }}>
            © 2025 TriApt. Made with ❤️ for engineering students.
          </p>
        </div>
      </footer>

      {/* Chatbot */}
      <div className="chatbot-container">
        {chatOpen && (
          <div className="chatbot-window">
            <div className="chat-header">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="heading-3" style={{ margin: 0 }}>TriApt Assistant</span>
                <button
                  onClick={() => setChatOpen(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="chat-messages">
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  style={{
                    marginBottom: '1rem',
                    padding: '0.5rem',
                    borderRadius: '8px',
                    backgroundColor: message.type === 'bot' ? 'var(--accent-wash)' : 'var(--bg-section)',
                    marginLeft: message.type === 'user' ? '2rem' : '0',
                    marginRight: message.type === 'bot' ? '2rem' : '0'
                  }}
                >
                  <p className="body-small" style={{ margin: 0 }}>{message.text}</p>
                </div>
              ))}
            </div>
            <div className="chat-input">
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  placeholder="Say anything to get a random TriApt question or fact!"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                />
                <button onClick={handleChatSend} className="btn-primary" style={{ padding: '0.5rem 1rem' }}>
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
        <button
          className="chatbot-toggle"
          onClick={handleChatToggle}
        >
          <MessageCircle size={24} />
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
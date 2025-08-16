// Mock data for TriApt - Engineering Aptitude Test

export const mockQuestions = [
  {
    id: 1,
    question: "What is the time complexity of binary search algorithm?",
    options: ["O(n)", "O(log n)", "O(n log n)", "O(n²)"],
    correctAnswer: 1,
    category: "Data Structures & Algorithms"
  },
  {
    id: 2,
    question: "Which of the following is NOT a principle of Object-Oriented Programming?",
    options: ["Encapsulation", "Inheritance", "Polymorphism", "Compilation"],
    correctAnswer: 3,
    category: "Object-Oriented Programming"
  },
  {
    id: 3,
    question: "In a relational database, what does ACID stand for?",
    options: [
      "Atomicity, Consistency, Isolation, Durability",
      "Association, Consistency, Isolation, Dependency",
      "Atomicity, Concurrency, Isolation, Durability",
      "Association, Concurrency, Integration, Dependency"
    ],
    correctAnswer: 0,
    category: "Database Management"
  },
  {
    id: 4,
    question: "What is the purpose of a constructor in a class?",
    options: [
      "To destroy objects",
      "To initialize objects",
      "To copy objects",
      "To compare objects"
    ],
    correctAnswer: 1,
    category: "Object-Oriented Programming"
  },
  {
    id: 5,
    question: "Which sorting algorithm has the best average-case time complexity?",
    options: ["Bubble Sort", "Selection Sort", "Merge Sort", "Insertion Sort"],
    correctAnswer: 2,
    category: "Data Structures & Algorithms"
  },
  {
    id: 6,
    question: "What does CPU stand for?",
    options: [
      "Computer Processing Unit",
      "Central Processing Unit",
      "Core Processing Unit",
      "Central Program Unit"
    ],
    correctAnswer: 1,
    category: "Computer Architecture"
  },
  {
    id: 7,
    question: "In networking, what does HTTP stand for?",
    options: [
      "HyperText Transfer Protocol",
      "HyperText Transmission Protocol",
      "HyperText Transport Protocol",
      "HyperText Transfer Process"
    ],
    correctAnswer: 0,
    category: "Computer Networks"
  },
  {
    id: 8,
    question: "Which of the following is a non-volatile memory?",
    options: ["RAM", "Cache", "ROM", "Register"],
    correctAnswer: 2,
    category: "Computer Architecture"
  },
  {
    id: 9,
    question: "What is the main advantage of using a linked list over an array?",
    options: [
      "Random access",
      "Dynamic size",
      "Better cache performance",
      "Less memory usage"
    ],
    correctAnswer: 1,
    category: "Data Structures & Algorithms"
  },
  {
    id: 10,
    question: "In software engineering, what does DRY principle stand for?",
    options: [
      "Don't Repeat Yourself",
      "Do Repeat Yourself",
      "Don't Rely Yourself",
      "Do Rely Yourself"
    ],
    correctAnswer: 0,
    category: "Software Engineering"
  }
];

export const mockUser = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  token: "mock-jwt-token-12345"
};

export const mockAuthResponse = {
  user: mockUser,
  token: mockUser.token,
  message: "Login successful"
};

export const chatbotResponses = [
  {
    keywords: ["hello", "hi", "hey", "start", "help", "support"],
    response: "Hello! Welcome to TriApt - your Computer Science & Engineering aptitude test platform. I'm here to help you with any questions about our platform, tests, features, or how to get started!"
  },
  {
    keywords: ["test", "quiz", "questions", "exam", "aptitude", "practice"],
    response: "Our aptitude tests cover essential CS & Engineering topics including Data Structures, Algorithms, OOP, Databases, Computer Networks, and Software Engineering. Each test has 10 carefully selected questions with multiple choice answers. Perfect for interview preparation!"
  },
  {
    keywords: ["free", "cost", "price", "payment", "money", "charge"],
    response: "Great news! TriApt is completely FREE for all students and professionals. No hidden charges, no subscriptions, no premium features - everything is accessible at no cost. We believe quality education should be free for everyone!"
  },
  {
    keywords: ["time", "duration", "minutes", "hours", "long", "quick"],
    response: "Each test takes about 15-20 minutes to complete. You get 20 minutes total, but most users finish in 15 minutes. It's designed to be quick yet comprehensive - perfect for daily practice sessions!"
  },
  {
    keywords: ["topics", "subjects", "syllabus", "coverage", "content", "curriculum"],
    response: "We cover 6 main areas: 📚 Data Structures & Algorithms, 🔧 Object-Oriented Programming, 🗄️ Database Management, 💻 Computer Architecture, 🌐 Computer Networks, and ⚙️ Software Engineering principles. All questions are sourced from real interview experiences!"
  },
  {
    keywords: ["login", "signup", "register", "account", "create", "join"],
    response: "Creating an account is super easy! Click 'Sign Up' to register with just your name, email, and password. Having an account lets you track your progress, save results, and see your improvement over time. It's completely free!"
  },
  {
    keywords: ["score", "result", "performance", "percentage", "grade"],
    response: "After completing a test, you'll see your score, percentage, and detailed results. We show which questions you got right/wrong and provide explanations. You can retake tests as many times as you want to improve!"
  },
  {
    keywords: ["retake", "retry", "again", "repeat", "multiple", "times"],
    response: "Absolutely! You can take tests as many times as you want. There's no limit! This is perfect for practicing and improving your understanding. Each attempt helps you learn and get better prepared for real interviews."
  },
  {
    keywords: ["difficulty", "level", "hard", "easy", "beginner", "advanced"],
    response: "Our questions are designed for intermediate level - suitable for students and professionals preparing for technical interviews. They're challenging enough to be meaningful but not overly complex. Perfect for building confidence!"
  },
  {
    keywords: ["mobile", "phone", "tablet", "responsive", "device"],
    response: "Yes! TriApt works perfectly on all devices - desktop, laptop, tablet, and mobile phones. Our responsive design ensures you get the same great experience whether you're studying at home or on the go!"
  },
  {
    keywords: ["interview", "job", "preparation", "career", "placement"],
    response: "TriApt is specifically designed for technical interview preparation! Our questions are based on real interview experiences from top companies. Regular practice here will definitely boost your confidence for actual interviews!"
  },
  {
    keywords: ["update", "new", "fresh", "latest", "recent"],
    response: "We regularly update our question bank with new problems and current industry trends. This ensures you're always practicing with relevant, up-to-date content that reflects what's actually asked in interviews today!"
  },
  {
    keywords: ["progress", "track", "history", "improvement", "analytics"],
    response: "With a free account, you can track your progress over time, see your test history, and monitor improvement across different topics. It's a great way to identify your strengths and areas that need more practice!"
  },
  {
    keywords: ["why", "choose", "benefit", "advantage", "better"],
    response: "TriApt offers: ✅ Completely FREE access, ✅ Real interview questions, ✅ Multiple attempts, ✅ Progress tracking, ✅ Works on all devices, ✅ No time pressure for learning, ✅ Instant results with explanations. It's designed by engineers, for engineers!"
  },
  {
    keywords: ["triaapt", "name", "meaning", "about", "company", "who"],
    response: "TriApt stands for 'Technical Readiness & Intelligence Aptitude Test' - we're focused on helping CS & Engineering students and professionals succeed in their technical careers through smart, accessible practice tests!"
  }
];

// Fallback responses for unmatched queries
export const fallbackResponses = [
  "That's a great question! While I focus on TriApt-related topics, feel free to ask me about our tests, features, pricing, or how to get started with practice questions.",
  "I'd love to help with that! I'm specialized in answering questions about TriApt platform, tests, and features. What would you like to know about our aptitude tests?",
  "Interesting question! I'm here to help with anything related to TriApt - our free CS & Engineering tests, how they work, what topics we cover, or how to create an account.",
  "I'm focused on helping with TriApt-related questions! Ask me about our test format, topics covered, scoring system, or any other features of our platform.",
  "That's outside my expertise, but I'm great at answering questions about TriApt! Try asking about our question types, test duration, or how to track your progress."
];

export const mockFAQs = [
  {
    id: 1,
    question: "Is TriApt really free to use?",
    answer: "Yes! TriApt is completely free for all users. We believe quality education and practice materials should be accessible to everyone preparing for their engineering careers."
  },
  {
    id: 2,
    question: "What topics are covered in the aptitude test?",
    answer: "Our tests cover essential computer science and engineering topics including Data Structures & Algorithms, Object-Oriented Programming, Database Management, Computer Architecture, Computer Networks, and Software Engineering principles."
  },
  {
    id: 3,
    question: "How many questions are in each test?",
    answer: "Each aptitude test contains 10 carefully curated questions designed to test your fundamental understanding of core engineering concepts."
  },
  {
    id: 4,
    question: "Do I need to create an account to take tests?",
    answer: "While you can preview sample questions without an account, creating a free account allows you to track your progress, save results, and access your test history."
  },
  {
    id: 5,
    question: "Can I retake the tests?",
    answer: "Absolutely! You can retake tests as many times as you want. This is a great way to practice and improve your understanding of different topics."
  },
  {
    id: 6,
    question: "Are the questions updated regularly?",
    answer: "Yes, we regularly update our question bank with new problems and scenarios to ensure you're practicing with current and relevant content."
  }
];

// Mock API functions
export const mockAPI = {
  login: async (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email && password) {
          resolve(mockAuthResponse);
        } else {
          throw new Error("Invalid credentials");
        }
      }, 1000);
    });
  },

  signup: async (name, email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (name && email && password) {
          resolve({
            ...mockAuthResponse,
            user: { ...mockUser, name, email }
          });
        } else {
          throw new Error("All fields are required");
        }
      }, 1000);
    });
  },

  getQuestions: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockQuestions);
      }, 500);
    });
  },

  getUserData: async (token) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockUser);
      }, 300);
    });
  }
};
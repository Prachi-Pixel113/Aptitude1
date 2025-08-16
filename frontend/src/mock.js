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
    keywords: ["hello", "hi", "hey", "start"],
    response: "Hello! Welcome to TriApt - your Computer Science & Engineering aptitude test platform. How can I help you today?"
  },
  {
    keywords: ["test", "quiz", "questions", "exam"],
    response: "Our aptitude test covers Data Structures, Algorithms, OOP, Databases, Computer Networks, and Software Engineering. Each test has 10 carefully selected questions. Would you like to start?"
  },
  {
    keywords: ["free", "cost", "price", "payment"],
    response: "Great news! TriApt is completely FREE for all students and professionals. No hidden charges - just quality aptitude test questions to help you prepare."
  },
  {
    keywords: ["time", "duration", "minutes"],
    response: "Each test is designed to be completed in 15-20 minutes. You can take your time to think through each question carefully."
  },
  {
    keywords: ["topics", "subjects", "syllabus", "coverage"],
    response: "We cover: Data Structures & Algorithms, Object-Oriented Programming, Database Management, Computer Architecture, Computer Networks, and Software Engineering principles."
  },
  {
    keywords: ["login", "signup", "register", "account"],
    response: "You can create a free account to track your progress and save your test results. Click on 'Sign Up' to get started, or 'Login' if you already have an account."
  },
  {
    keywords: ["help", "support", "contact"],
    response: "I'm here to help! You can ask me about test topics, how the platform works, or any other questions about TriApt. What would you like to know?"
  }
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
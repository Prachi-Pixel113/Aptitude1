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

// Random questions the chatbot can ask users about TriApt
export const randomTriAptQuestions = [
  "What do you think about TriApt being completely free for everyone? 🤔",
  "Which of our 6 main topics interests you the most - Data Structures, OOP, Databases, Computer Architecture, Networks, or Software Engineering? 📚",
  "How do you usually prepare for technical interviews? Have you tried practice tests before? 💭",
  "What's your biggest challenge when it comes to coding interviews? 🎯",
  "Do you prefer practicing on mobile or desktop when studying? 📱💻",
  "What motivated you to visit TriApt today? Are you preparing for a specific interview? 🚀",
  "How important is it for you to track your progress while practicing? 📊",
  "What do you think about the idea of taking unlimited practice tests? 🔄",
  "Which programming concepts do you find most challenging - algorithms, databases, or system design? ⚙️",
  "Do you think 15-20 minutes is the right duration for a practice test, or would you prefer longer/shorter? ⏱️",
  "What features would make your technical interview preparation more effective? 💡",
  "Have you ever felt overwhelmed by expensive coding bootcamps or paid platforms? 💸",
  "What's your experience level - student, recent graduate, or experienced professional? 🎓",
  "Do you think having instant results and explanations helps you learn better? ✨",
  "What's more important to you - quantity of practice questions or quality explanations? 🤓",
  "How often do you think someone should practice coding problems per week? 📅"
];

// Random facts and interesting content about TriApt
export const randomTriAptFacts = [
  "🎉 Fun fact: TriApt was designed by engineers who went through hundreds of technical interviews themselves!",
  "💡 Did you know? Our question bank is constantly updated with problems from real interviews at top tech companies!",
  "🌟 Amazing stat: Most TriApt users see a 40% improvement in their confidence after just 5 practice sessions!",
  "🔥 Cool feature: You can retake tests unlimited times - we believe in learning through repetition!",
  "🎯 Pro tip: Our questions cover exactly what you'll face in real interviews - no theoretical fluff!",
  "📱 Tech fact: TriApt works seamlessly on any device - practice anywhere, anytime!",
  "🚀 Mission fact: We believe quality technical education should be free and accessible to everyone!",
  "⚡ Speed fact: Most users complete our tests in under 15 minutes, making it perfect for daily practice!",
  "🎨 Design fact: Our interface is designed to reduce anxiety and help you focus on learning!",
  "📊 Progress fact: With an account, you can track your improvement across all 6 technical areas!",
  "🔍 Quality fact: Each question is carefully crafted to test real-world problem-solving skills!",
  "💎 Value fact: TriApt provides the same quality as paid platforms but completely free!",
  "🌈 Diversity fact: Our questions span from basic CS concepts to advanced engineering principles!",
  "🎪 Engagement fact: Users who practice regularly are 3x more likely to ace their interviews!",
  "🔮 Future fact: We're constantly adding new topics based on emerging industry trends!",
  "🏆 Success fact: Thousands of engineers have landed their dream jobs after practicing on TriApt!"
];

// Motivational and engaging responses
export const chatbotEngagementResponses = [
  "That's awesome! 🌟 Here's something interesting about TriApt...",
  "Great to hear from you! 😊 Let me share something cool...",
  "Thanks for chatting! 🎉 Here's a fun TriApt fact...", 
  "I love talking about TriApt! 💫 Did you know...",
  "Exciting to connect! 🚀 Here's something you might find interesting...",
  "Nice! 👌 Let me tell you something about our platform...",
  "Happy to chat! 😄 Here's an interesting tidbit...",
  "Cool! ✨ Here's something that makes TriApt special..."
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
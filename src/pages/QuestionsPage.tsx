import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    id: 1,
    question: 'What is your primary role in your organization?',
    options: ['Logistics Manager', 'Supply Chain Analyst', 'Operations Director', 'Other'],
  },
  {
    id: 2,
    question: 'Which industry best describes your business?',
    options: ['Retail', 'Manufacturing', 'E-commerce', 'Transportation', 'Other'],
  },
  {
    id: 3,
    question: 'What is your biggest challenge in logistics?',
    options: ['Cost Reduction', 'Efficiency Improvement', 'Visibility', 'Compliance', 'Other'],
  },
];

const QuestionsPage: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const navigate = useNavigate();

  const handleAnswerChange = (answer: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestionIndex]: answer }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // All questions answered, navigate to Index.tsx
      navigate('/dashboard'); // Assuming Index.tsx is the dashboard route
    }
  };

  const handleSkip = () => {
    // All questions skipped or answered, navigate to Index.tsx
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4">
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-lg shadow-xl border border-emerald-200 w-full max-w-2xl">
        <div className="flex items-center justify-center mb-6">
          <img src="/favicon.png" alt="OptiLogix Logo" className="h-10 w-10 mr-2" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Answer a few questions
          </h2>
        </div>
        {currentQuestionIndex < questions.length ? (
          <div className="mb-4">
            <p className="text-lg mb-4 text-gray-700">{questions[currentQuestionIndex].question}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {questions[currentQuestionIndex].options?.map((option, index) => (
                <button
                  key={index}
                  className={`p-4 rounded-lg border-2 transition duration-200 ${answers[currentQuestionIndex] === option
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-800 shadow-md'
                    : 'border-gray-300 bg-white hover:border-emerald-400 hover:bg-emerald-50'}
                  `}
                  onClick={() => handleAnswerChange(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-xl font-semibold mb-4 text-emerald-700">Thank you for answering the questions!</p>
            <p className="text-gray-600">Redirecting to dashboard...</p>
          </div>
        )}
        <div className="flex justify-between mt-6">
          {currentQuestionIndex < questions.length ? (
            <button
              onClick={handleNextQuestion}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold py-2 px-4 rounded-md shadow-lg hover:from-emerald-600 hover:to-teal-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-opacity-75"
            >
              {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
            </button>
          ) : (
            <div />
          )}
          <button
            onClick={handleSkip}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-200"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionsPage;
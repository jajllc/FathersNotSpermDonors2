import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, User, HelpCircle } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface FAQ {
  keywords: string[];
  question: string;
  answer: string;
  category: string;
}

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const faqDatabase: FAQ[] = [
    {
      keywords: ['custody', 'child custody', 'visitation', 'parenting time'],
      question: "What are fathers' rights regarding child custody?",
      answer: "Fathers have equal legal rights to seek custody of their children. However, statistics show that mothers receive primary custody in about 83% of cases. Fathers can petition for joint custody, sole custody, or increased visitation rights. The court's decision should be based on the best interests of the child, not gender stereotypes.",
      category: "custody"
    },
    {
      keywords: ['discrimination', 'bias', 'unfair treatment', 'gender bias'],
      question: "Do fathers face discrimination in family court?",
      answer: "Unfortunately, yes. Many fathers report experiencing gender bias in family court proceedings. Courts sometimes operate under outdated assumptions that mothers are naturally better caregivers. This systemic bias is what our movement aims to change through legal reform and awareness.",
      category: "discrimination"
    },
    {
      keywords: ['support', 'child support', 'financial', 'money', 'payments'],
      question: "What about child support obligations?",
      answer: "Fathers are typically required to pay child support even with limited custody time. The amount is usually calculated based on income and custody arrangement. However, fathers should also have the right to equal parenting time, which can affect support calculations. Consult with a family law attorney for specific guidance.",
      category: "support"
    },
    {
      keywords: ['rights', 'legal rights', 'parental rights', 'father rights'],
      question: "What legal rights do fathers have?",
      answer: "Fathers have the right to: seek custody or visitation, make decisions about their child's education and healthcare (if granted legal custody), receive information about their child's welfare, and petition the court for custody modifications. These rights should be equal to mothers' rights.",
      category: "rights"
    },
    {
      keywords: ['help', 'assistance', 'support groups', 'resources'],
      question: "Where can fathers get help and support?",
      answer: "Fathers can find support through: local fathers' rights organizations, family law attorneys specializing in fathers' rights, support groups (both online and in-person), counseling services, and advocacy organizations like ours. Don't face these challenges alone - help is available.",
      category: "help"
    },
    {
      keywords: ['statistics', 'facts', 'numbers', 'data'],
      question: "What are the statistics on fathers' rights?",
      answer: "Key statistics: 24+ million single fathers in the US, 83% of custody cases favor mothers, only 17% of fathers receive primary custody, and children with involved fathers show 40% better outcomes in academics and emotional development. These numbers highlight the need for reform.",
      category: "statistics"
    },
    {
      keywords: ['petition', 'sign', 'support', 'movement'],
      question: "How can I support the fathers' rights movement?",
      answer: "You can help by: signing our petition for legal reform, sharing your story, contacting your representatives, joining local support groups, spreading awareness on social media, and donating to fathers' rights organizations. Every voice matters in creating change.",
      category: "support"
    },
    {
      keywords: ['lawyer', 'attorney', 'legal help', 'representation'],
      question: "Do I need a lawyer for custody issues?",
      answer: "While not legally required, having an experienced family law attorney is highly recommended, especially one who understands fathers' rights issues. They can help navigate the legal system, protect your rights, and present your case effectively. Many offer free consultations.",
      category: "legal"
    },
    {
      keywords: ['children', 'kids', 'impact', 'effects'],
      question: "How does father absence affect children?",
      answer: "Research shows children benefit significantly from having both parents involved. Father absence can lead to increased behavioral problems, lower academic performance, and emotional difficulties. This is why equal parenting rights are so important - it's about what's best for children.",
      category: "children"
    },
    {
      keywords: ['court', 'judge', 'hearing', 'trial'],
      question: "What should I expect in family court?",
      answer: "Family court proceedings can be emotionally challenging. Be prepared with documentation, dress professionally, remain calm and respectful, focus on your child's best interests, and follow your attorney's advice. Courts should consider factors like parenting ability, stability, and the child's relationship with each parent.",
      category: "court"
    }
  ];

  const quickQuestions = [
    "What are fathers' custody rights?",
    "How can I get help with my case?",
    "What statistics support fathers' rights?",
    "How can I support this movement?"
  ];

  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        text: "Hello! I'm here to help answer your questions about fathers' rights. You can ask me about custody, legal rights, support resources, or how to get involved in our movement. What would you like to know?",
        isBot: true,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [messages.length]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const findBestMatch = (userInput: string): FAQ | null => {
    const input = userInput.toLowerCase();
    let bestMatch: FAQ | null = null;
    let highestScore = 0;

    faqDatabase.forEach(faq => {
      let score = 0;
      faq.keywords.forEach(keyword => {
        if (input.includes(keyword.toLowerCase())) {
          score += keyword.length; // Longer keywords get higher scores
        }
      });
      
      if (score > highestScore) {
        highestScore = score;
        bestMatch = faq;
      }
    });

    return highestScore > 0 ? bestMatch : null;
  };

  const generateResponse = (userInput: string): string => {
    const match = findBestMatch(userInput);
    
    if (match) {
      return match.answer;
    }

    // Default responses for unmatched queries
    const defaultResponses = [
      "That's a great question about fathers' rights. While I don't have a specific answer for that, I'd recommend contacting a family law attorney or reaching out to our support team for personalized guidance.",
      "I understand you're looking for information about fathers' rights. For questions I can't answer, please consider signing our petition or contacting local fathers' rights organizations for more detailed assistance.",
      "Thank you for your question. While I may not have that specific information, you can find more resources by exploring our website or connecting with fathers' rights support groups in your area."
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = generateResponse(inputText);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleQuickQuestion = (question: string) => {
    setInputText(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
          isOpen ? 'hidden' : 'block'
        }`}
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-full">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Fathers' Rights Assistant</h3>
                <p className="text-blue-100 text-sm">Ask me anything!</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.isBot
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.isBot && (
                      <Bot className="h-4 w-4 mt-1 flex-shrink-0 text-blue-600" />
                    )}
                    {!message.isBot && (
                      <User className="h-4 w-4 mt-1 flex-shrink-0 text-blue-100" />
                    )}
                    <div>
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.isBot ? 'text-gray-500' : 'text-blue-100'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-2xl">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4 text-blue-600" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2">
              <p className="text-xs text-gray-500 mb-2 flex items-center">
                <HelpCircle className="h-3 w-3 mr-1" />
                Quick questions:
              </p>
              <div className="space-y-1">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="w-full text-left text-xs bg-gray-50 hover:bg-gray-100 p-2 rounded-lg transition-colors text-gray-700"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about fathers' rights..."
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-3 rounded-lg transition-colors disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
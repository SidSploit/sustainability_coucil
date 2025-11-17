import React, { useState, useRef, useEffect } from 'react';
import { ChatIcon, CloseIcon, SendIcon } from './Icons';
import { getChatbotResponse } from '../services/geminiService';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: "Hi! How can I help you understand the Sustainability Council app?" }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!userInput.trim() || isLoading) return;
    const newMessages: Message[] = [...messages, { sender: 'user', text: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setIsLoading(true);

    // This is a simplified history for the API call
    const apiHistory = newMessages.map(m => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: m.text
    }));


    try {
        const botResponse = await getChatbotResponse(apiHistory, userInput);
        setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    } catch (error) {
        setMessages(prev => [...prev, { sender: 'bot', text: "Sorry, I'm having trouble connecting." }]);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-primary text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform z-50"
        aria-label="Open chatbot"
      >
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-xl shadow-2xl flex flex-col z-50 transition-opacity animate-fade-in-up">
          <header className="bg-primary text-white p-3 rounded-t-xl">
            <h3 className="font-bold text-center">Help Assistant</h3>
          </header>
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-2 rounded-lg ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-gray-200 text-text-dark'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                  <div className="flex justify-start">
                       <div className="bg-gray-200 text-text-dark p-2 rounded-lg">
                           <span className="animate-pulse">...</span>
                       </div>
                  </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <div className="p-2 border-t border-gray-200">
            <div className="flex items-center">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask a question..."
                className="flex-1 p-2 border border-border-light rounded-lg focus:ring-primary focus:border-primary bg-white text-text-dark"
              />
              <button onClick={handleSend} className="ml-2 p-2 text-primary disabled:text-gray-400" disabled={isLoading}>
                <SendIcon />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;

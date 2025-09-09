import React, { useState } from 'react';
import { Send, Bot, User, Clock } from 'lucide-react';

const messages = [
  {
    id: 1,
    type: 'ai',
    content: 'Traffic conflict detected between Train 12951 and 12627 at Junction B. Recommendation: Hold 12627 for 2 minutes.',
    timestamp: '14:25:33',
    status: 'pending'
  },
  {
    id: 2,
    type: 'controller',
    content: 'Acknowledged. Implementing hold on 12627. Signal set to red.',
    timestamp: '14:25:45',
    status: 'completed'
  },
  {
    id: 3,
    type: 'ai',
    content: 'Conflict resolved. Throughput maintained at optimal levels. 12627 cleared for Platform 2.',
    timestamp: '14:27:33',
    status: 'completed'
  },
  {
    id: 4,
    type: 'controller',
    content: 'All trains now running on schedule. Excellent prediction accuracy.',
    timestamp: '14:28:12',
    status: 'completed'
  },
  {
    id: 5,
    type: 'ai',
    content: 'New prediction: Platform 3 will reach 85% capacity in next 15 minutes. Consider routing Train 12019 to Platform 4.',
    timestamp: '14:30:45',
    status: 'pending'
  }
];

export function CommunicationView() {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="h-full bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-6">
        <h2 className="text-2xl font-bold text-white mb-2">Communication Center</h2>
        <p className="text-gray-400">Controller ↔ AI Assistant Interaction Log</p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'controller' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-2xl rounded-lg p-4 ${
              message.type === 'controller' 
                ? 'bg-orange-600 text-white' 
                : 'bg-gray-700 text-gray-100'
            }`}>
              <div className="flex items-center space-x-2 mb-2">
                {message.type === 'ai' ? (
                  <Bot className="w-4 h-4 text-blue-400" />
                ) : (
                  <User className="w-4 h-4 text-orange-300" />
                )}
                <span className="text-sm font-medium">
                  {message.type === 'ai' ? 'AI Assistant' : 'Controller'}
                </span>
                <div className="flex items-center space-x-1 text-xs opacity-75">
                  <Clock className="w-3 h-3" />
                  <span>{message.timestamp}</span>
                </div>
              </div>
              
              <p className="text-sm leading-relaxed">{message.content}</p>
              
              {message.status && (
                <div className="mt-2 flex justify-end">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    message.status === 'completed' 
                      ? 'bg-green-800 text-green-200' 
                      : 'bg-yellow-800 text-yellow-200'
                  }`}>
                    {message.status === 'completed' ? 'Completed' : 'Pending'}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {/* AI is typing indicator */}
        <div className="flex justify-start">
          <div className="bg-gray-700 rounded-lg p-4 max-w-xs">
            <div className="flex items-center space-x-2">
              <Bot className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-gray-300">AI is analyzing traffic patterns</span>
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-gray-800 border-t border-gray-700 p-4">
        <div className="flex space-x-4">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message or command..."
            className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-20"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>Send</span>
          </button>
        </div>
        
        {/* Quick Commands */}
        <div className="mt-3 flex flex-wrap gap-2">
          <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm rounded-full transition-colors">
            Override AI Recommendation
          </button>
          <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm rounded-full transition-colors">
            Request Status Update
          </button>
          <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm rounded-full transition-colors">
            Emergency Protocol
          </button>
          <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm rounded-full transition-colors">
            Maintenance Schedule
          </button>
        </div>
      </div>
    </div>
  );
}
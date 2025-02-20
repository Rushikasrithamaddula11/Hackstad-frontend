import React, { useState } from 'react';

export default function TeamChat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { text: newMessage, sender: 'You' }]);
      setNewMessage('');
    }
  };

  return (
    <div className="bg-white-800 rounded-lg shadow-lg h-[calc(100vh-120px)] flex flex-col">
      {/* Header */}
      <div className="p-4 border-white-border-gray-700">
        <h2 className="text-xl font-semibold text-black">Team Chat</h2>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} className="p-2 rounded-lg bg-white-700 text-black w-fit max-w-xs">
              <strong>{msg.sender}: </strong>{msg.text}
            </div>
          ))
        ) : (
          <p className="text-gray-400">No messages yet. Start the conversation!</p>
        )}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-white-700 flex">
        <input
          type="text"
          className="flex-1 p-2 rounded-lg bg-white-700 text-black outline-none"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button 
          onClick={handleSendMessage} 
          className="ml-2 bg-cyan-600 hover:bg-cyan-700 text-white py-2 px-4 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}

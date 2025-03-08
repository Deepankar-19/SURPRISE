import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, query, orderBy, limit, addDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../firebase';
import Navbar from '../components/Navbar';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const q = query(
      collection(db, 'messages'),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(messagesData.reverse());
    });

    return () => unsubscribe();
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !auth.currentUser) return;

    try {
      await addDoc(collection(db, 'messages'), {
        text: newMessage,
        createdAt: serverTimestamp(),
        userId: auth.currentUser.uid,
        userName: auth.currentUser.displayName,
        userAvatar: auth.currentUser.photoURL
      });
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="pattern-topography fixed inset-0 pointer-events-none" />
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 pt-24 pb-20">
        <div className="glass-card p-4 h-[calc(100vh-12rem)] flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4 p-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-start space-x-3 ${message.userId === auth.currentUser?.uid ? 'flex-row-reverse space-x-reverse' : ''}`}
              >
                <img
                  src={message.userAvatar}
                  alt={message.userName}
                  className="w-8 h-8 rounded-full"
                />
                <div className={`max-w-[70%] ${message.userId === auth.currentUser?.uid ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-white'} p-3 rounded-2xl shadow-md`}>
                  <p className="text-sm font-medium mb-1">{message.userName}</p>
                  <p className="text-sm">{message.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="artistic-input flex-1"
            />
            <button type="submit" className="artistic-button">
              Send
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Chat;
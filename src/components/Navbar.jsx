import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { House, ChatCircle, User } from '@phosphor-icons/react';

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 md:top-0 md:bottom-auto glass-card py-4 px-6 z-50"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
          ArtsyMeme
        </Link>
        
        <div className="flex gap-6">
          <Link
            to="/"
            className="flex items-center gap-2 hover:text-purple-600 transition-colors"
          >
            <House weight="fill" size={24} />
            <span className="hidden md:block">Home</span>
          </Link>
          
          <Link
            to="/chat"
            className="flex items-center gap-2 hover:text-purple-600 transition-colors"
          >
            <ChatCircle weight="fill" size={24} />
            <span className="hidden md:block">Chat</span>
          </Link>
          
          <Link
            to="/profile"
            className="flex items-center gap-2 hover:text-purple-600 transition-colors"
          >
            <User weight="fill" size={24} />
            <span className="hidden md:block">Profile</span>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
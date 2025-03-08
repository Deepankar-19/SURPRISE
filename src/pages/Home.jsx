import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Navbar from '../components/Navbar';

const Home = () => {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const q = query(
          collection(db, 'memes'),
          orderBy('createdAt', 'desc'),
          limit(10)
        );
        const querySnapshot = await getDocs(q);
        const memesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMemes(memesData);
      } catch (error) {
        console.error('Error fetching memes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMemes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="pattern-topography fixed inset-0 pointer-events-none" />
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 pt-24 pb-20">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-float">
              <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {memes.map((meme) => (
              <motion.div
                key={meme.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="glass-card overflow-hidden rounded-xl"
              >
                <img
                  src={meme.imageUrl}
                  alt={meme.caption}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <p className="text-gray-800">{meme.caption}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <img
                        src={meme.userAvatar}
                        alt={meme.userName}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-sm text-gray-600">{meme.userName}</span>
                    </div>
                    <button className="artistic-button text-sm py-1">
                      Share
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Stats from '@/components/Stats';
import Footer from '@/components/Footer';
import { clearExpiredUrls, getAllUrls, UrlData } from '@/utils/urlService';

const StatsPage = () => {
  const [urls, setUrls] = useState<UrlData[]>([]);
  
  useEffect(() => {
    // Clear expired URLs and get the updated list
    clearExpiredUrls();
    const storedUrls = getAllUrls();
    setUrls(storedUrls);
    
    // Set up interval to refresh data
    const interval = setInterval(() => {
      clearExpiredUrls();
      const refreshedUrls = getAllUrls();
      setUrls(refreshedUrls);
    }, 60000); // Refresh every minute
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow px-6 py-10">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8 text-center"
          >
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">
              Link Analytics
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Track the performance of your shortened URLs
            </p>
          </motion.div>
          
          {urls.length > 0 ? (
            <Stats urls={urls} />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="text-center py-10"
            >
              <p className="text-muted-foreground">
                No links have been created yet. Start shortening URLs to see statistics.
              </p>
            </motion.div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default StatsPage;

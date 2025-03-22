
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import UrlForm from '@/components/UrlForm';
import UrlCard from '@/components/UrlCard';
import Footer from '@/components/Footer';
import { clearExpiredUrls, getAllUrls, UrlData } from '@/utils/urlService';

const Index = () => {
  const [urls, setUrls] = useState<UrlData[]>([]);
  
  useEffect(() => {
    // Clear expired URLs and get the updated list
    clearExpiredUrls();
    const storedUrls = getAllUrls().sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setUrls(storedUrls);
    
    // Set up interval to refresh data
    const interval = setInterval(() => {
      clearExpiredUrls();
      const refreshedUrls = getAllUrls().sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setUrls(refreshedUrls);
    }, 60000); // Refresh every minute
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <section className="url-form-container py-16 sm:py-20 px-6">
          <UrlForm />
        </section>
        
        <section className="px-6 py-10">
          <div className="container mx-auto max-w-4xl">
            {urls.length > 0 ? (
              <>
                <motion.h2 
                  className="text-2xl font-display font-bold mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  Your Recent Links
                </motion.h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {urls.slice(0, 6).map((url, index) => (
                    <motion.div
                      key={url.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <UrlCard
                        id={url.id}
                        originalUrl={url.originalUrl}
                        shortUrl={url.shortUrl}
                        clicks={url.clicks}
                        createdAt={url.createdAt}
                        expiresAt={url.expiresAt}
                      />
                    </motion.div>
                  ))}
                </div>
              </>
            ) : null}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

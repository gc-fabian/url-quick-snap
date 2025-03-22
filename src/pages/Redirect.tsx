
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getUrlById, incrementClickCount, isUrlExpired } from '@/utils/urlService';

const Redirect = () => {
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const handleRedirect = async () => {
      if (!id) {
        setError('Invalid URL ID');
        setIsLoading(false);
        return;
      }
      
      try {
        const urlData = getUrlById(id);
        
        if (!urlData) {
          setError('URL not found');
          setIsLoading(false);
          return;
        }
        
        if (isUrlExpired(urlData)) {
          setError('This link has expired');
          setIsLoading(false);
          return;
        }
        
        // Increment click count
        incrementClickCount(id);
        
        // Redirect to the original URL
        window.location.href = urlData.originalUrl;
      } catch (error) {
        setError('An error occurred while redirecting');
        setIsLoading(false);
      }
    };
    
    // Add a small delay to show the loading state
    const timer = setTimeout(() => {
      handleRedirect();
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      {isLoading ? (
        <motion.div 
          className="flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
          <h1 className="text-xl font-medium mb-2">Redirecting...</h1>
          <p className="text-muted-foreground">Taking you to your destination</p>
        </motion.div>
      ) : error ? (
        <motion.div 
          className="glass-card rounded-xl p-8 max-w-md text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-destructive/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </div>
          
          <h1 className="text-2xl font-bold mb-2">Link Error</h1>
          <p className="text-muted-foreground mb-6">{error}</p>
          
          <Link to="/">
            <Button className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </motion.div>
      ) : null}
    </div>
  );
};

export default Redirect;

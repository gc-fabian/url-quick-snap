
import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <motion.footer 
      className="w-full py-6 mt-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="container mx-auto px-4 flex flex-col items-center justify-center">
        <p className="text-sm text-muted-foreground flex items-center">
          Created with <Heart className="h-3 w-3 mx-1 text-red-500" /> for Inventures
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          All shortened URLs expire after 3 days
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;

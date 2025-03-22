
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <motion.div 
        className="glass-card rounded-xl p-8 max-w-md text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-6">
          <h1 className="text-9xl font-display font-bold text-primary/20">404</h1>
        </div>
        
        <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <Link to="/">
          <Button className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;


import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LinkShortening, BarChart3 } from 'lucide-react';

const Header = () => {
  return (
    <motion.header 
      className="w-full py-6 px-6 sm:px-8 md:px-12 flex justify-between items-center"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Link to="/" className="flex items-center space-x-2 focus-ring rounded-md p-1">
        <LinkShortening className="w-6 h-6 text-primary" />
        <span className="text-xl font-display font-medium">URLQuick</span>
      </Link>
      <nav>
        <ul className="flex items-center space-x-6">
          <li>
            <Link 
              to="/" 
              className="text-foreground/80 hover:text-foreground transition-colors duration-200 font-medium text-sm focus-ring rounded-md p-1"
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/stats" 
              className="flex items-center space-x-1 text-foreground/80 hover:text-foreground transition-colors duration-200 focus-ring rounded-md p-1"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="font-medium text-sm">Stats</span>
            </Link>
          </li>
        </ul>
      </nav>
    </motion.header>
  );
};

export default Header;

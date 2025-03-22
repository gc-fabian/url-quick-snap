
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clipboard, Check, ExternalLink, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';

interface UrlCardProps {
  id: string;
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  createdAt: string;
  expiresAt: string;
}

const UrlCard = ({ id, originalUrl, shortUrl, clicks, createdAt, expiresAt }: UrlCardProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      toast.success('Copied to clipboard!');
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const truncateUrl = (url: string, maxLength = 40) => {
    if (url.length <= maxLength) return url;
    return url.substring(0, maxLength) + '...';
  };
  
  // Calculate time left until expiration
  const expirationDate = new Date(expiresAt);
  const timeLeft = formatDistanceToNow(expirationDate, { addSuffix: true });
  
  return (
    <motion.div 
      className="glass-card rounded-xl overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4 sm:p-5">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <a 
              href={shortUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline flex items-center gap-1.5"
            >
              {shortUrl.split('/').pop()}
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="w-3.5 h-3.5 mr-1" />
              <span>Expires {timeLeft}</span>
            </div>
          </div>
          
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground mb-1">Original URL:</span>
            <p className="text-sm text-foreground/80 mb-4 break-all line-clamp-1" title={originalUrl}>
              {truncateUrl(originalUrl)}
            </p>
          </div>
          
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="bg-secondary rounded-lg px-3 py-1 text-xs font-medium">
              {clicks} clicks
            </div>
            
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              className="h-8 focus-ring flex items-center gap-1.5 text-xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Copied
                </>
              ) : (
                <>
                  <Clipboard className="w-3.5 h-3.5" /> Copy URL
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UrlCard;

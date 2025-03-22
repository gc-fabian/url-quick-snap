
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link2, ArrowRight, Clipboard, Check, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { createShortUrl } from '@/utils/urlService';
import { Label } from '@/components/ui/label';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { useForm } from 'react-hook-form';

interface UrlFormData {
  url: string;
  customName?: string;
}

const UrlForm = () => {
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const form = useForm<UrlFormData>({
    defaultValues: {
      url: '',
      customName: ''
    }
  });

  const handleSubmit = async (data: UrlFormData) => {
    if (!data.url) {
      toast.error('Please enter a URL');
      return;
    }

    try {
      setLoading(true);
      const result = await createShortUrl(data.url, data.customName);
      setShortUrl(result.shortUrl);
      toast.success('URL shortened successfully!');
    } catch (error) {
      toast.error('Failed to shorten URL. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!shortUrl) return;
    
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

  return (
    <motion.div 
      className="w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex items-center justify-center mb-6">
        <div className="bg-primary/10 rounded-full p-3">
          <Link2 className="w-6 h-6 text-primary" />
        </div>
      </div>

      <h1 className="text-3xl md:text-4xl font-display font-bold text-center mb-3">
        Shorten Your Links
      </h1>
      
      <p className="text-muted-foreground text-center mb-8 max-w-lg mx-auto">
        Create shortened URLs that are easy to share and track. 
        All links automatically expire after 3 days.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="mb-8 space-y-4">
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL to shorten</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="Enter your long URL here"
                      className="h-12 pl-4 pr-12 text-base focus-ring"
                      required
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="customName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Custom name (optional)</FormLabel>
                  <div className="relative flex-grow">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="e.g. your-name or your-brand"
                        className="h-12 pl-4 pr-12 text-base focus-ring"
                        {...field}
                      />
                    </FormControl>
                    <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  </div>
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="h-12 px-6 font-medium transition-all duration-300 flex items-center gap-2 mt-2"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></span>
                  <span>Shortening...</span>
                </span>
              ) : (
                <>
                  Shorten <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>

      {shortUrl && (
        <motion.div 
          className="glass-card p-4 rounded-xl overflow-hidden"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex-grow truncate text-center sm:text-left">
              <p className="text-xs text-muted-foreground mb-1">Your shortened URL:</p>
              <a 
                href={shortUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary font-medium hover:underline truncate block"
              >
                {shortUrl}
              </a>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              className="min-w-[100px] focus-ring flex items-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" /> Copied
                </>
              ) : (
                <>
                  <Clipboard className="w-4 h-4" /> Copy
                </>
              )}
            </Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default UrlForm;

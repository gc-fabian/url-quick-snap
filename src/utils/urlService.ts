
import { nanoid } from 'nanoid';
import { toast } from 'sonner';

export interface UrlData {
  id: string;
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  createdAt: string;
  expiresAt: string;
}

// In a real application, this would be stored in a database
// For this demo, we'll use localStorage
const STORAGE_KEY = 'url_shortener_data';

// Helper to get the base URL for the shortened URLs
const getBaseUrl = () => {
  return window.location.origin;
};

// Generate a short ID for the URL
const generateShortId = () => {
  return nanoid(8); // 8 character ID
};

// Get all URLs from localStorage
export const getAllUrls = (): UrlData[] => {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (!storedData) return [];
    
    const parsedData = JSON.parse(storedData) as UrlData[];
    return parsedData;
  } catch (error) {
    console.error('Error getting URLs from storage:', error);
    return [];
  }
};

// Save URLs to localStorage
const saveUrls = (urls: UrlData[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(urls));
  } catch (error) {
    console.error('Error saving URLs to storage:', error);
    throw new Error('Failed to save URL data');
  }
};

// Create a new short URL
export const createShortUrl = async (originalUrl: string): Promise<UrlData> => {
  try {
    // Validate URL format
    try {
      new URL(originalUrl);
    } catch (error) {
      // If the URL doesn't include a protocol, try prepending https://
      if (!originalUrl.startsWith('http://') && !originalUrl.startsWith('https://')) {
        originalUrl = 'https://' + originalUrl;
        
        // Validate again
        try {
          new URL(originalUrl);
        } catch (error) {
          throw new Error('Invalid URL format');
        }
      } else {
        throw new Error('Invalid URL format');
      }
    }
    
    const shortId = generateShortId();
    const shortUrl = `${getBaseUrl()}/r/${shortId}`;
    
    // Calculate expiration (3 days from now)
    const now = new Date();
    const expirationDate = new Date();
    expirationDate.setDate(now.getDate() + 3);
    
    const newUrlData: UrlData = {
      id: shortId,
      originalUrl,
      shortUrl,
      clicks: 0,
      createdAt: now.toISOString(),
      expiresAt: expirationDate.toISOString()
    };
    
    // Get existing URLs and add the new one
    const existingUrls = getAllUrls();
    existingUrls.push(newUrlData);
    
    // Save updated list
    saveUrls(existingUrls);
    
    return newUrlData;
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    }
    throw error;
  }
};

// Get URL by ID
export const getUrlById = (id: string): UrlData | null => {
  const urls = getAllUrls();
  const url = urls.find(u => u.id === id);
  return url || null;
};

// Get URL by short URL
export const getUrlByShortUrl = (shortUrl: string): UrlData | null => {
  const urls = getAllUrls();
  const url = urls.find(u => u.shortUrl === shortUrl);
  return url || null;
};

// Increment click count for a URL
export const incrementClickCount = (id: string): void => {
  const urls = getAllUrls();
  const updatedUrls = urls.map(url => {
    if (url.id === id) {
      return {
        ...url,
        clicks: url.clicks + 1
      };
    }
    return url;
  });
  
  saveUrls(updatedUrls);
};

// Check if a URL has expired
export const isUrlExpired = (url: UrlData): boolean => {
  const expirationDate = new Date(url.expiresAt);
  return new Date() > expirationDate;
};

// Delete a URL by ID
export const deleteUrl = (id: string): void => {
  const urls = getAllUrls();
  const filteredUrls = urls.filter(url => url.id !== id);
  saveUrls(filteredUrls);
};

// Clear expired URLs
export const clearExpiredUrls = (): void => {
  const urls = getAllUrls();
  const filteredUrls = urls.filter(url => !isUrlExpired(url));
  
  // If we actually removed any URLs
  if (filteredUrls.length < urls.length) {
    saveUrls(filteredUrls);
  }
};

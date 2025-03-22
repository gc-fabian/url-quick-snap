
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UrlData } from '@/utils/urlService';

interface StatsProps {
  urls: UrlData[];
}

const Stats = ({ urls }: StatsProps) => {
  // Filter active URLs (not expired)
  const activeUrls = urls.filter(url => new Date(url.expiresAt) > new Date());
  
  // Sort URLs by clicks (descending)
  const topUrls = [...urls].sort((a, b) => b.clicks - a.clicks).slice(0, 5);
  
  // Prepare chart data
  const chartData = topUrls.map(url => ({
    id: url.id.substring(0, 6),
    clicks: url.clicks,
  }));

  // Calculate total clicks
  const totalClicks = urls.reduce((sum, url) => sum + url.clicks, 0);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Links</CardDescription>
              <CardTitle className="text-3xl">{urls.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Active: {activeUrls.length}
              </p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Clicks</CardDescription>
              <CardTitle className="text-3xl">{totalClicks}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Avg: {urls.length ? (totalClicks / urls.length).toFixed(1) : 0} per link
              </p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Top Link</CardDescription>
              <CardTitle className="text-3xl">
                {topUrls.length > 0 ? topUrls[0].clicks : 0}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground truncate">
                {topUrls.length > 0 ? `ID: ${topUrls[0].id.substring(0, 8)}...` : 'No links yet'}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {chartData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass-card p-4 rounded-xl"
        >
          <h3 className="text-lg font-medium mb-4">Top Links by Clicks</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="id" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  formatter={(value) => [`${value} clicks`, 'Clicks']}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid rgba(229, 231, 235, 1)',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  }}
                />
                <Bar 
                  dataKey="clicks" 
                  fill="hsl(var(--primary))" 
                  radius={[4, 4, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Stats;

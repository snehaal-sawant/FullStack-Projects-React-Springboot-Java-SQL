import React, { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import { blogsData as fallbackBlogs } from '../data/blogsData';
import { BlogCard } from '../components/ui/BlogCard';
import { blogService } from '../services/blogService';
import { Loader } from '../components/common/Loader';

export const BlogsPage = () => {
  const [blogs, setBlogs] = useState(fallbackBlogs);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await blogService.getAllBlogs();
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          setBlogs(res.data);
        }
      } catch (err) {
        console.error('Error loading blog posts:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="space-y-12 pb-16">
      
      <section className="bg-navy-950 text-white py-14 border-b border-navy-800 text-center space-y-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-400/20 text-sky-300 rounded-full text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Maritime Insights</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight mt-2">
            MARITIME BLOGS & TECHNICAL GUIDES
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed mt-2">
            Read expert articles on ship spares procurement, engine maintenance planning, and vessel cost optimization.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <Loader label="Loading technical blog articles..." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map(blog => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

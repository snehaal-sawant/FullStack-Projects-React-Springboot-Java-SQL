import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Clock, ArrowLeft, Send } from 'lucide-react';
import { blogsData as fallbackBlogs } from '../data/blogsData';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Loader } from '../components/common/Loader';
import { useRfq } from '../context/RfqContext';
import { blogService } from '../services/blogService';

export const BlogDetailPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { openQuoteModalForProduct } = useRfq();

  useEffect(() => {
    const fetchBlog = async () => {
      setIsLoading(true);
      try {
        const res = await blogService.getBlogBySlug(slug);
        if (res.success && res.data) {
          setBlog(res.data);
        } else {
          const fallback = fallbackBlogs.find(b => b.slug === slug) || fallbackBlogs[0];
          setBlog(fallback);
        }
      } catch (err) {
        console.error(err);
        const fallback = fallbackBlogs.find(b => b.slug === slug) || fallbackBlogs[0];
        setBlog(fallback);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (isLoading) {
    return <Loader label="Loading blog article..." />;
  }

  if (!blog) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold">Blog Article Not Found</h2>
        <Link to="/blog">
          <Button variant="primary">Return to Articles</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-16">
      
      {/* Header */}
      <section className="bg-navy-950 text-white py-12 border-b border-navy-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:underline">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Blogs</span>
          </Link>

          {blog.category && <Badge variant="gold" size="md">{blog.category}</Badge>}

          <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-white leading-tight">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 border-t border-navy-800 pt-3">
            {blog.author && (
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-amber-400" />
                {blog.author}
              </span>
            )}
            {blog.date && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  {blog.date}
                </span>
              </>
            )}
            {blog.readTime && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  {blog.readTime}
                </span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {blog.image && (
          <div className="aspect-video bg-slate-100 rounded-2xl overflow-hidden border shadow-lg">
            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-sm text-slate-700 leading-relaxed font-sans">
          {blog.content && (
            <div className="prose max-w-none space-y-4">
              {blog.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          )}

          <div className="p-6 bg-sky-50 rounded-xl border border-sky-200 space-y-3 mt-8">
            <h4 className="font-bold text-navy-950 font-heading text-base">Looking for Marine Spares Mentioned in Article?</h4>
            <p className="text-xs text-slate-600">
              Sanvi Maritime maintains an extensive inventory of Sulzer, Yanmar, Daihatsu, and MAN B&W spare parts with global express delivery.
            </p>
            <Button
              onClick={() => openQuoteModalForProduct(null)}
              variant="gold"
              size="sm"
              icon={Send}
            >
              Request Quote Now
            </Button>
          </div>
        </div>

      </article>

    </div>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

export const BlogCard = ({ blog }) => {
  return (
    <Card className="flex flex-col h-full group overflow-hidden hover:border-maritime-blue transition-all duration-300">
      
      <div className="relative aspect-video bg-slate-100 overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80";
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="navy" size="sm">{blog.category}</Badge>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-amber-500" />
              {blog.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-500" />
              {blog.readTime}
            </span>
          </div>

          <Link to={`/blog/${blog.slug}`}>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-maritime-blue transition-colors line-clamp-2 font-heading">
              {blog.title}
            </h3>
          </Link>

          <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
            {blog.excerpt}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 flex items-center gap-1">
            <User className="w-3 h-3 text-slate-400" />
            {blog.author}
          </span>

          <Link
            to={`/blog/${blog.slug}`}
            className="text-xs font-bold text-maritime-blue hover:text-navy-950 flex items-center gap-1"
          >
            <span>Read Article</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

    </Card>
  );
};

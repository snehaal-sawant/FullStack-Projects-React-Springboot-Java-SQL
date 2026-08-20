import React from 'react';
import { Link } from 'react-router-dom';
import { Send, Plus, Check, MapPin, Eye } from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { useRfq } from '../../context/RfqContext';

export const ProductCard = ({ product }) => {
  const { addToBasket, basketItems, openQuoteModalForProduct } = useRfq();
  const isInBasket = basketItems.some(item => item.id === product.id);

  return (
    <Card className="flex flex-col h-full group overflow-hidden border border-slate-200/80 hover:border-sky-300 transition-all duration-300">
      
      {/* Product Image & Badges */}
      <div className="relative aspect-video sm:aspect-[4/3] bg-slate-100 overflow-hidden rounded-t-lg">
        <img
          src={product.image}
          alt={product.title}
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80";
          }}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-3">
          <Link
            to={`/products/${product.id}`}
            className="w-full text-center py-2 px-3 bg-white/90 backdrop-blur text-navy-900 text-xs font-bold rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-1.5 shadow"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Specifications</span>
          </Link>
        </div>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
          {product.isNewArrival && (
            <Badge variant="gold" size="sm">New Arrival</Badge>
          )}
          <Badge variant="navy" size="sm">{product.brand}</Badge>
        </div>

        <div className="absolute top-2.5 right-2.5 z-10">
          <Badge 
            variant={product.condition.includes('New') ? 'green' : 'blue'} 
            size="sm"
          >
            {product.condition}
          </Badge>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        
        <div className="space-y-1.5">
          <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider flex items-center justify-between">
            <span>PN: <strong className="text-navy-900">{product.partNumber}</strong></span>
            <span className="flex items-center gap-1 text-[10px] text-slate-400">
              <MapPin className="w-3 h-3 text-amber-500" />
              {product.location}
            </span>
          </div>

          <Link to={`/products/${product.id}`} className="block">
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-maritime-blue transition-colors line-clamp-2 font-heading">
              {product.title}
            </h3>
          </Link>

          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
          <Button
            onClick={() => addToBasket(product)}
            variant={isInBasket ? "outline" : "primary"}
            size="sm"
            className="flex-1 text-xs"
            icon={isInBasket ? Check : Plus}
          >
            {isInBasket ? "In Basket" : "Add to Quote"}
          </Button>

          <Button
            onClick={() => openQuoteModalForProduct(product)}
            variant="gold"
            size="sm"
            className="px-2.5"
            aria-label="Direct RFQ"
          >
            <Send className="w-3.5 h-3.5" />
          </Button>
        </div>

      </div>

    </Card>
  );
};

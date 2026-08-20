import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, MapPin, Send, Plus, Check, ArrowLeft, Anchor, ChevronRight } from 'lucide-react';
import { productService } from '../services/productService';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Loader } from '../components/common/Loader';
import { ProductCard } from '../components/ui/ProductCard';
import { useRfq } from '../context/RfqContext';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { addToBasket, basketItems, openQuoteModalForProduct } = useRfq();

  useEffect(() => {
    const fetchDetail = async () => {
      setIsLoading(true);
      try {
        const res = await productService.getProductById(id);
        if (res.success) {
          setProduct(res.data);
          const rel = await productService.getRelatedProducts(res.data.category, res.data.id);
          setRelatedProducts(rel.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (isLoading) {
    return <Loader label="Loading product specifications..." />;
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold">Spare Part Not Found</h2>
        <Link to="/products">
          <Button variant="primary">Return to Catalog</Button>
        </Link>
      </div>
    );
  }

  const isInBasket = basketItems.some(item => item.id === product.id);

  return (
    <div className="space-y-12 pb-16">
      
      {/* Breadcrumb */}
      <div className="bg-slate-100 border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-slate-600 flex items-center gap-2">
          <Link to="/" className="hover:text-maritime-blue">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link to="/products" className="hover:text-maritime-blue">Products</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="font-bold text-slate-900 line-clamp-1">{product.title}</span>
        </div>
      </div>

      {/* Main Detail Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Left: Image Box */}
          <div className="space-y-4">
            <div className="aspect-4/3 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-md">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 bg-sky-50 rounded-xl border border-sky-200 flex items-center justify-between text-xs text-sky-800">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-500" />
                <span>Available at: <strong>{product.location}</strong></span>
              </div>
              <Badge variant="navy">{product.availability}</Badge>
            </div>
          </div>

          {/* Right: Info & Specs */}
          <div className="space-y-6">
            
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="navy" size="md">{product.brand}</Badge>
                <Badge variant={product.condition.includes('New') ? 'green' : 'blue'} size="md">
                  {product.condition}
                </Badge>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950 font-heading">
                {product.title}
              </h1>

              <div className="text-xs font-mono text-slate-500 bg-slate-100 inline-block px-2.5 py-1 rounded border">
                Part Number: <strong className="text-slate-900">{product.partNumber}</strong>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>

            {/* Technical Specifications Table */}
            {product.specs && (
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-heading">
                  Technical Specifications
                </h4>
                <div className="border border-slate-200 rounded-xl overflow-hidden bg-white text-xs">
                  {Object.entries(product.specs).map(([key, value], idx) => (
                    <div
                      key={key}
                      className={`grid grid-cols-3 px-4 py-2.5 ${
                        idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'
                      } border-b last:border-b-0 border-slate-100`}
                    >
                      <span className="font-semibold text-slate-600">{key}</span>
                      <span className="col-span-2 font-mono text-slate-900 font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quality badge highlight */}
            <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 p-3 rounded-xl border border-emerald-200">
              <ShieldCheck className="w-5 h-5 flex-shrink-0" />
              <span>Inspected and pressure tested with Class certificate available on dispatch.</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200">
              <Button
                onClick={() => openQuoteModalForProduct(product)}
                variant="gold"
                size="lg"
                className="flex-1"
                icon={Send}
              >
                Request Quotation
              </Button>

              <Button
                onClick={() => addToBasket(product)}
                variant={isInBasket ? "outline" : "primary"}
                size="lg"
                icon={isInBasket ? Check : Plus}
              >
                {isInBasket ? "In Quote Basket" : "Add to Basket"}
              </Button>
            </div>

          </div>

        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-slate-200">
          <h3 className="text-xl font-bold text-navy-950 font-heading mb-6">
            SIMILAR MARINE SPARE PARTS
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(rel => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
};

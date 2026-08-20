import React from 'react';
import { X, Trash2, Plus, Minus, Send, ShoppingBag } from 'lucide-react';
import { useRfq } from '../../context/RfqContext';
import { Button } from '../common/Button';

export const RfqBasketDrawer = () => {
  const { 
    basketItems, 
    removeFromBasket, 
    updateQuantity, 
    clearBasket, 
    isBasketOpen, 
    setIsBasketOpen, 
    openQuoteModalForProduct 
  } = useRfq();

  if (!isBasketOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-navy-950/70 backdrop-blur-sm transition-opacity" 
        onClick={() => setIsBasketOpen(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-slideDown">
        
        {/* Header */}
        <div className="p-4 bg-navy-900 text-white flex items-center justify-between border-b border-navy-800">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold font-heading text-base text-white">Quote Basket ({basketItems.length})</h3>
          </div>
          <button
            onClick={() => setIsBasketOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {basketItems.length === 0 ? (
            <div className="py-16 text-center text-slate-500 space-y-3">
              <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-700">Your Quote Basket is empty</p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Browse our marine spare parts catalog and add items to request a bulk quote.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs">
                <span className="font-bold text-slate-600 uppercase tracking-wider">Requested Spare Parts</span>
                <button
                  onClick={clearBasket}
                  className="text-rose-600 hover:underline flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All</span>
                </button>
              </div>

              {basketItems.map(item => (
                <div key={item.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 flex gap-3 items-center">
                  <img src={item.image} alt={item.title} className="w-14 h-14 object-cover rounded-lg border bg-white flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-slate-900 line-clamp-1">{item.title}</h5>
                    <p className="text-[11px] text-slate-500 font-mono">PN: {item.partNumber || 'N/A'}</p>
                    <span className="text-[10px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                      {item.condition}
                    </span>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg p-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold w-5 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromBasket(item.id)}
                    className="text-slate-400 hover:text-rose-600 p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Footer CTA */}
        {basketItems.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-2">
            <Button
              onClick={() => {
                setIsBasketOpen(false);
                openQuoteModalForProduct(null);
              }}
              variant="gold"
              className="w-full"
              icon={Send}
            >
              Submit RFQ for {basketItems.length} Items
            </Button>
          </div>
        )}

      </div>
    </div>
  );
};

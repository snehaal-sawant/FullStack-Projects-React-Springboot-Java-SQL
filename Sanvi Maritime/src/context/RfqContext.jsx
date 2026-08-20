import React, { createContext, useContext, useState, useEffect } from 'react';

const RfqContext = createContext();

export const RfqProvider = ({ children }) => {
  const [basketItems, setBasketItems] = useState(() => {
    const saved = localStorage.getItem('sanvi_rfq_basket');
    return saved ? JSON.parse(saved) : [];
  });

  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeItemForQuote, setActiveItemForQuote] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem('sanvi_rfq_basket', JSON.stringify(basketItems));
  }, [basketItems]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const addToBasket = (product, quantity = 1) => {
    setBasketItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    showToast(`Added "${product.partNumber || product.title}" to Quote Basket`);
  };

  const removeFromBasket = (productId) => {
    setBasketItems(prev => prev.filter(item => item.id !== productId));
    showToast('Item removed from Quote Basket', 'info');
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromBasket(productId);
      return;
    }
    setBasketItems(prev => prev.map(item => item.id === productId ? { ...item, quantity } : item));
  };

  const clearBasket = () => {
    setBasketItems([]);
  };

  const openQuoteModalForProduct = (product = null) => {
    setActiveItemForQuote(product);
    setIsModalOpen(true);
  };

  const closeQuoteModal = () => {
    setIsModalOpen(false);
    setActiveItemForQuote(null);
  };

  return (
    <RfqContext.Provider value={{
      basketItems,
      addToBasket,
      removeFromBasket,
      updateQuantity,
      clearBasket,
      isBasketOpen,
      setIsBasketOpen,
      isModalOpen,
      openQuoteModalForProduct,
      closeQuoteModal,
      activeItemForQuote,
      toast,
      showToast
    }}>
      {children}
    </RfqContext.Provider>
  );
};

export const useRfq = () => {
  const context = useContext(RfqContext);
  if (!context) {
    throw new Error('useRfq must be used within an RfqProvider');
  }
  return context;
};

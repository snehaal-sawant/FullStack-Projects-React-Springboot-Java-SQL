import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

const MobileMenuItem = ({ title, items, onClose }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  const toggleCategory = (id) => {
    setActiveCategory((prev) => (prev === id ? null : id));
  };

  return (
    <div className="border-b border-gray-200 px-6">

      {/* Main Menu */}

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex w-full items-center justify-between py-4 text-left text-base font-semibold text-slate-700 transition-colors duration-300 hover:text-[#005BAC]"
      >
        <span>{title}</span>

        <FaChevronDown
          className={`transition-transform duration-300 ${
            menuOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Categories */}

      <AnimatePresence>

        {menuOpen && (

          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >

            {items.map((category) => (

              <div
                key={category.id}
                className="border-t border-gray-100"
              >

                {/* Category */}

                <button
                  onClick={() => toggleCategory(category.id)}
                  className="flex w-full items-center justify-between py-3 pl-4 pr-2 text-left text-sm font-medium text-slate-700 hover:text-[#005BAC]"
                >
                  <span>{category.title}</span>

                  <FaChevronRight
                    size={14}
                    className={`transition-transform duration-300 ${
                      activeCategory === category.id
                        ? "rotate-90 text-[#005BAC]"
                        : ""
                    }`}
                  />
                </button>

                {/* Services */}

                <AnimatePresence>

                  {activeCategory === category.id && (

                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >

                      <div className="pb-3 pl-8">

                        {category.cards.map((card) => (

                          <Link
                            key={card.id}
                            to={card.path}
                            onClick={onClose}
                            className="block rounded-md py-2 text-sm text-slate-600 transition-colors duration-300 hover:text-[#005BAC]"
                          >
                            {card.title}
                          </Link>

                        ))}

                      </div>

                    </motion.div>

                  )}

                </AnimatePresence>

              </div>

            ))}

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
};

export default MobileMenuItem;
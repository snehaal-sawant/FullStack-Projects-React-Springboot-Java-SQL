import { FaChevronRight } from "react-icons/fa";

const Sidebar = ({ menu, activeCategory, setActiveCategory }) => {
  return (
    <div className="w-[290px] border-r border-gray-200 bg-gray-100">

      {menu.map((item) => {

        const isActive = activeCategory === item.id;

        return (
          <button
            key={item.id}
            onMouseEnter={() => setActiveCategory(item.id)}
            className={`group flex w-full items-center justify-between border-l-4 px-6 py-3 text-left transition-all duration-300
              ${
                isActive
                  ? "border-blue-900 bg-white"
                  : "border-transparent hover:border-blue-900"
              }
            `}
          >
            <span
              className={`text-sm font-semibold transition-colors duration-300
                ${
                  isActive
                    ? "text-blue-900"
                    : "text-slate-700 group-hover:text-blue-900"
                }
              `}
            >
              {item.title}
            </span>

            <FaChevronRight
              size={18}
              className={`transition-all duration-300
                ${
                  isActive
                    ? "text-blue-900 translate-x-1"
                    : "text-gray-500 group-hover:text-blue-900 group-hover:translate-x-1"
                }
              `}
            />
          </button>
        );
      })}

    </div>
  );
};

export default Sidebar;
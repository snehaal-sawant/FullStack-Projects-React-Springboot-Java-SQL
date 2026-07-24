import { ChevronRight } from "lucide-react";
import { loanMenu } from "./menuData";

const Sidebar = ({ activeCategory, setActiveCategory }) => {
  return (
    <div className="w-[290px] border-r border-gray-200 bg-gray-100">
      <h3 className="px-6 py-3 text-center">Loans</h3>
      {loanMenu.map((item) => (

        <button
          key={item.id}
          onMouseEnter={() => setActiveCategory(item.id)}
          className={`group flex w-full items-center justify-between border-l-4 px-6 py-3 text-left transition-all duration-300 text-blue-800

          ${
            activeCategory === item.id
              ? "border-blue-900 font-bold-700 text-blue-900 bg-white"
              : "border-transparent hover:border-blue-900"
          }
          `}
        >

          <span
            className={`font-bold text-sm transition-colors duration-300

            ${
              activeCategory === item.id
                ? "text-blue-900"
                : "text-slate-700 group-hover:text-blue-900 "
            }
            `}
          >
            {item.title}
          </span>

          <ChevronRight
            size={18}
            className={`transition-all duration-300

            ${
              activeCategory === item.id
                ? "text-blue-900 translate-x-1"
                : "text-gray-900 group-hover:text-blue-700 group-hover:translate-x-1"
            }
            `}
          />

        </button>

      ))}

    </div>
  );
};

export default Sidebar;
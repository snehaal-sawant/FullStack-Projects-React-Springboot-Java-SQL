import { FaChevronDown } from "react-icons/fa";

const NavItem = ({
      title,
      menuType,
      active = false,
      onMouseEnter,
    }) => {
    return (
    <li className="relative group cursor-pointer h-full flex items-center"
    onMouseEnter={() => onMouseEnter(menuType)}>

      <div className="flex items-center gap-1 px-2 h-full text-[14px] font-medium text-slate-700 transition-colors duration-300 group-hover:text-[#005BAC]">

        <span>{title}</span>

        <FaChevronDown
          size={12}
          strokeWidth={2}
          className="transition-transform duration-300 group-hover:rotate-180"
        />

      </div>

      {/* Active Blue Line */}
      {active && (
        <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-[#005BAC]"></span>
      )}
    </li>
  );
};

export default NavItem;
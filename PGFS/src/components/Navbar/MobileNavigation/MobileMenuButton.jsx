import { FaBars, FaTimes } from "react-icons/fa";

const MobileMenuButton = ({ isOpen, toggleMenu }) => {
  return (
    <button
      onClick={toggleMenu}
      className="
        lg:hidden
        flex
        items-center
        justify-center
        w-9
        h-9
        rounded-lg
        text-slate-700
        hover:bg-gray-100
        hover:text-[#005BAC]
        transition-all
        duration-300
      "
      aria-label="Toggle Navigation"
    >
      {isOpen ? (
        <FaTimes size={20} />
      ) : (
        <FaBars size={20} />
      )}
    </button>
  );
};

export default MobileMenuButton;
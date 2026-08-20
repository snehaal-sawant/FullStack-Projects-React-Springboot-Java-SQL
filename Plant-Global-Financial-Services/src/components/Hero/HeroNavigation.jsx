import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const HeroNavigation = ({ prevSlide, nextSlide }) => {
  return (
    <>
      {/* Previous Button */}
      <button
        onClick={prevSlide}
        className="
          absolute
          left-5
          top-1/2
          -translate-y-1/2
          z-20
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          bg-white/80
          shadow-lg
          backdrop-blur-sm
          transition-all
          duration-300
          hover:bg-[#005BAC]
          hover:text-white
        "
      >
        <FaChevronLeft size={18} />
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="
          absolute
          right-5
          top-1/2
          -translate-y-1/2
          z-20
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          bg-white/80
          shadow-lg
          backdrop-blur-sm
          transition-all
          duration-300
          hover:bg-[#005BAC]
          hover:text-white
        "
      >
        <FaChevronRight size={18} />
      </button>
    </>
  );
};

export default HeroNavigation;
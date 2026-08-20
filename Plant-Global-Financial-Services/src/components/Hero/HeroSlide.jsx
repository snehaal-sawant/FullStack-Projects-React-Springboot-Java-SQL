import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";
import { motion } from "framer-motion";

const HeroSlide = ({ slide }) => {
  return (
    <motion.section
      className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 py-10 md:py-14 lg:py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
          duration: 0.6,
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[45%_45%] items-center gap-10 lg:gap-20">

        {/* Left Section */}
        <HeroContent slide={slide} />

        {/* Right Section */}
        <HeroImage slide={slide} />

      </div>

    </motion.section>
  );
};

export default HeroSlide;
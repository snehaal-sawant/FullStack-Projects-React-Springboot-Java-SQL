import HeroButtons from "./HeroButtons";
import HeroStats from "./HeroStats";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    x: -40,
  },

  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
    },
  },

  exit: {
    opacity: 0,
    x: -40,
  },
};

const HeroContent = ({ slide }) => {
  return (
    <motion.div
      className="space-y-6 lg:space-y-8 text-center lg:text-left"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      initial={{
          x: -80,
          opacity: 0,
      }}
      animate={{
          x: 0,
          opacity: 1,
      }}
      exit={{
          x: -80,
          opacity: 0,
      }}
      transition={{
          duration: 0.7,
      }}
      >

      {/* Badge */}

      <motion.span variants={itemVariants} className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-xs font-semibold text-[#005BAC]">
        {slide.badge}
      </motion.span>

      {/* Heading */}

      <motion.div variants={itemVariants}>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[50px] font-bold text-slate-900 leading-[1.05]">

          {slide.title}

          <span className="block text-[#005BAC]">
            {slide.highlight}
          </span>

        </h1>

      </motion.div>

      {/* Description */}

      <motion.p variants={itemVariants} className="max-w-xl mx-auto lg:mx-0 text-base sm:text-lg font-medium leading-[1.3] text-slate-600">
        {slide.description}
      </motion.p>

      {/* Buttons */}

      <motion.div variants={itemVariants}>
        <HeroButtons slide={slide} />
      </motion.div>

      {/* Statistics */}

      <motion.div variants={itemVariants}>
        <HeroStats stats={slide.stats} />
      </motion.div>

    </motion.div>
  );
};

export default HeroContent;
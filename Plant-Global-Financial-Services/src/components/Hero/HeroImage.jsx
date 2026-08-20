import { motion } from "framer-motion";

const HeroImage = ({ slide }) => {
  return (
    <motion.div
      className="relative flex justify-center items-center mt-5 lg:mt-0"
      initial={{
        x: 80,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
        y: [0, -8, 0],
      }}
      exit={{
        x: 80,
        opacity: 0,
      }}
      transition={{
        x: {
          duration: 0.8,
          ease: "easeOut",
        },
        opacity: {
          duration: 0.8,
        },
        y: {
          duration: 4,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        },
      }}
    >

      <img
        src={slide.image}
        alt={slide.title}
        className="
          h-[400px]
          w-full
          rounded-3xl
          object-cover
          shadow-2xl
        "
      />

    </motion.div>
  );
};

export default HeroImage;
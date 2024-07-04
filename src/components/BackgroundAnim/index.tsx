import { motion } from "framer-motion";
import rain from "../../assets/background/rain.svg";
import sun from "../../assets/background/sun.svg";

export default function BackgroundAnim() {
  return (
    <>
      <div className="pointer-events-none">
        <motion.img
          initial={{ opacity: 0.1 }}
          animate={{ opacity: 0.3 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute w-48 blur-3xl -left-6 top-[70%]"
          src={sun}
          alt="#"
        />
        <motion.img
          initial={{ opacity: 0.03 }}
          animate={{ opacity: 0.08 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute w-48 blur-3xl right-0 -top-12"
          src={rain}
          alt="#"
        />
      </div>
    </>
  );
}

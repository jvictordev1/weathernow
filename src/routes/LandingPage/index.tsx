import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <section className="flex text-white flex-col items-center text-center gap-4 mt-24">
      <div
        className="w-[350px] sm:w-[450px] px-1 lg:w-[700px]
      "
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="text-[47px] leading-[1] sm:text-6xl lg:text-[90px]"
        >
          Your newest <span className="text-amber-200">weather</span> friend.
        </motion.h1>
      </div>
      <p className="text-md font-normal max-w-72 text-zinc-700 lg:max-w-[400px] lg:text-3xl">
        Search and find the weather anywhere, anytime.
      </p>
      <button className="text-lg font-medium rounded-2xl py-3 px-14 mt-10 bg-radial-gradient">
        Get started
      </button>
    </section>
  );
}

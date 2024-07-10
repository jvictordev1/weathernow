import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex text-white flex-col mt-20 items-center text-center gap-4"
    >
      <h1 className="text-5xl">
        Your newest <span className="text-amber-200">weather</span> friend.
      </h1>
      <p className="text-md font-normal max-w-72 text-zinc-700">
        Search and find the weather anywhere, anytime.
      </p>
      <button className="text-md rounded-full py-3 px-6 bg-zinc-800">
        Get started
      </button>
    </motion.section>
  );
}

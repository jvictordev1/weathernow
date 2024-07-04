export default function WelcomeSection() {
  return (
    <section className="flex text-white font-md w-full mt-24 px-3 justify-center">
      <div className="flex flex-col items-center max-w-2xl text-center gap-4">
        <h1 className="text-5xl">
          Your newest <span className="text-amber-200">weather</span> friend.
        </h1>
        <p className="text-md font-normal max-w-72 text-zinc-700">
          Search and find the weather anywhere, anytime.
        </p>
        <button className="text-md rounded-full py-3 px-6 bg-zinc-800">
          Get started
        </button>
      </div>
    </section>
  );
}

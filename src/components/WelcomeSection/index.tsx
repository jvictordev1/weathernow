export default function WelcomeSection() {
  return (
    <section className="flex text-white font-md w-full mt-36 justify-center">
      <div className="flex flex-col items-center max-w-2xl text-center gap-12">
        <h1 className="text-7xl">
          Your newest <span className="text-amber-200">weather</span> friend.
        </h1>
        <p className="text-2xl font-normal max-w-96 text-zinc-700">
          Search and find the weather anywhere, anytime.
        </p>
        <button className="text-xl rounded-full py-3 px-12 bg-zinc-800">
          Get started
        </button>
      </div>
    </section>
  );
}

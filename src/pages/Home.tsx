import Button from "../components/Button";

function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <main className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <section className="flex w-full max-w-4xl flex-col items-center rounded-3xl bg-white/10 px-8 py-16 text-center shadow-2xl backdrop-blur-sm ring-1 ring-white/20">
          <h1 className="font-display text-6xl uppercase leading-none text-white md:text-8xl">
            Flip and Find
          </h1>
          <p className="mt-4 font-display text-xl uppercase tracking-wide text-white/95 md:text-3xl">
            Flip and find matching cards
          </p>
          <Button variant="primary" className="mt-10">
            Start Game
          </Button>
        </section>
      </main>
    </div>
  );
}

export default Home;

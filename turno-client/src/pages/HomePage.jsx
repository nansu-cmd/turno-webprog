import Button from "../components/Button.jsx";

const HomePage = () => {
  return (
    <div className="flex w-full flex-col gap-12 sm:gap-16">
      {/* Hero Section */}
      <section className="px-4 pt-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-orange-600">
              The Tenth Generation
            </p>
            <h1 className="max-w-xl text-4xl font-extrabold leading-tight text-zinc-900 sm:text-5xl lg:text-6xl">
               A legacy forged in the Dying Will.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-zinc-600 sm:text-lg">
              From our vigilant origins in Italy to the modern era, the Vongola Famiglia stands as the pillar of the underworld. We protect our own, maintain balance, and fight with absolute resolve.
            </p>
            <div className="mt-8 flex gap-4">
              <Button to="/about" variant="primary">Our History</Button>
              <Button to="/articles" variant="secondary">Access Archives</Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] shadow-2xl">
            <img 
              src="https://static.wikia.nocookie.net/reborn/images/4/4a/Vongola_10th_generation.png/revision/latest/scale-to-width-down/1200?cb=20190531141650" 
              alt="Tenth Generation Vongola" 
              className="h-full w-full object-cover min-h-[300px] lg:min-h-[500px] hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      {/* KPI Section */}
      <section className="bg-zinc-900 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Generations", value: "10" },
              { label: "Core Elements", value: "06" },
              { label: "Allied Famiglias", value: "25+" },
              { label: "Years of History", value: "400+" },
            ].map((stat, index) => (
              <div key={index} className="border-l-2 border-orange-600 pl-6">
                <p className="text-4xl font-extrabold text-white">{stat.value}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Elements Section */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-zinc-900">The Guardians of the Sky</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: "The Storm", img: "https://static.wikia.nocookie.net/reborn/images/9/94/G.PNG/revision/latest?cb=20100404043533", desc: "The fiercely blowing wind that never rests. The core of the Famiglia's offensive power, representing Disintegration." },
              { title: "The Rain", img: "https://static.wikia.nocookie.net/reborn/images/e/e6/H_Yamamoto.PNG/revision/latest?cb=20100710060912", desc: "The blessed shower that settles conflict and washes away everything. The calm swordsman representing Tranquility." },
              { title: "The Cloud", img: "https://static.wikia.nocookie.net/reborn/images/e/e9/Hibari_Kyoya.PNG/revision/latest/scale-to-width-down/1200?cb=20100421080639", desc: "The drifting cloud that cannot be bound by anyone. Protecting the family from an independent stance, representing Propagation." }
            ].map((guardian, idx) => (
              <article key={idx} className="group overflow-hidden rounded-3xl bg-zinc-50 shadow-sm transition-shadow hover:shadow-xl border border-zinc-100">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={guardian.img} alt={guardian.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-zinc-900">{guardian.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600">{guardian.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
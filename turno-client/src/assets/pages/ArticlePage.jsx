import Button from '../components/Button';

const ArticlePage = () => {
  return (
    <div className="flex w-full flex-col gap-12">
      {/* Hero Section */}
      <section className="bg-zinc-900 px-4 py-16 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-zinc-400">
            Vongola Archives
          </p>
          <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            Chronicles of the Vongola Famiglia
          </h1>
          <p className="mt-6 text-base leading-relaxed text-zinc-300">
            Delve into the history, battles, and legacy of the most powerful mafia family in the underworld. From Giotto's era to the Tenth Generation.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {[
              {
                category: "Artifacts",
                title: "The Mystery of the Vongola Rings",
                desc: "An in-depth look at the half-rings, the fierce succession battles, and the true power that slumbers within the Sky and its Guardians.",
                img: "https://static.wikia.nocookie.net/reborn/images/9/91/Original_Rings.PNG/revision/latest/scale-to-width-down/250?cb=20190617234019"
              },
              {
                category: "Guardians",
                title: "The Six Elements: Protectors of the Sky",
                desc: "Storm, Rain, Sun, Lightning, Cloud, and Mist. Understanding the unique combat roles and personality traits of the Decimo's closest family.",
                img: "https://static.wikia.nocookie.net/reborn/images/7/71/1st_Guardians.PNG/revision/latest/scale-to-width-down/1200?cb=20100404042833"
              },
              {
                category: "Combat",
                title: "Mastering the Dying Will Flame",
                desc: "The science and pure willpower behind the Dying Will Flame. How ultimate resolution translates into destructive and creative combat energy.",
                img: "https://static.wikia.nocookie.net/reborn/images/1/14/Vongola_Flames.jpg/revision/latest?cb=20190318155522"
              },
              {
                category: "History",
                title: "Giotto: The Legacy of Vongola Primo",
                desc: "Revisiting the origins of the vigilante group that evolved into the underworld's most formidable syndicate over four hundred years ago.",
                img: "https://static.wikia.nocookie.net/reborn/images/b/b4/Vongola_Primo.PNG/revision/latest/scale-to-width-down/1200?cb=20100408040000"
              }
            ].map((article, index) => (
              <article key={index} className="flex flex-col overflow-hidden rounded-[2rem] bg-white shadow-md border border-zinc-100 transition-transform hover:-translate-y-2 duration-300">
                <div className="aspect-video overflow-hidden">
                  <img src={article.img} alt={article.title} className="h-full w-full object-cover" />
                </div>
                
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
                    {article.category}
                  </p>
                  <h3 className="mt-3 text-xl font-bold leading-tight text-zinc-900">
                    {article.title}
                  </h3>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-600">
                    {article.desc}
                  </p>
                  <div className="mt-6 pt-6 border-t border-zinc-100">
                    <Button variant="secondary" className="w-full hover:bg-orange-50 hover:text-orange-600">Open Archive</Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;
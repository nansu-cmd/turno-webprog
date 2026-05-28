const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-12 sm:gap-16">
      <section className="px-4 pt-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="overflow-hidden rounded-[2rem] shadow-xl border-4 border-zinc-900">
            <img 
              src="https://i0.wp.com/images1.wikia.nocookie.net/__cb20100918063304/reborn/images/thumb/1/13/Primo_encouraging_Decimo.PNG/786px-Primo_encouraging_Decimo.PNG" 
              alt="Tsuna and Giotto" 
              className="h-full w-full object-cover min-h-[300px] lg:min-h-[450px]"
            />
          </div>

          <div className="lg:pl-8">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-orange-600">
              Vongola Primo's Will
            </p>
            <h1 className="text-4xl font-extrabold leading-tight text-zinc-900 sm:text-5xl">
              A bloodline of protectors and leaders.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-zinc-600">
              Founded by Giotto over 400 years ago in Italy, the Vongola started as a vigilante group to protect the weak from corrupt landlords and criminals. Today, under the leadership of Tsunayoshi Sawada, we return to those noble roots.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          
          <div>
            <h2 className="text-3xl font-bold text-zinc-900">The Will of the Sky</h2>
            <div className="mt-8 space-y-6">
              {[
                { title: "Absolute Acceptance", text: "The Sky is the element that colors and engulfs everything. A true Boss accepts their Guardians for who they are, regardless of their past or flaws." },
                { title: "Unwavering Resolve", text: "The Dying Will Flame is not born from hatred, but from the desperate resolve to protect what matters most. We fight not to destroy, but to preserve." },
                { title: "Unbreakable Bonds", text: "We do not demand submission; we demand trust. The strength of the Vongola lies in the unbreakable bonds forged between the Boss and the Guardians." }
              ].map((block, index) => (
                <article key={index} className="rounded-2xl bg-zinc-50 p-6 border-l-4 border-zinc-900 shadow-sm">
                  <h3 className="text-xl font-bold text-zinc-900">{block.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600">{block.text}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 content-start pt-2 lg:pt-16">
            <img src="https://static.wikia.nocookie.net/reborn/images/0/08/Vongola_Crest.PNG/revision/latest/scale-to-width/360?cb=20100331051508" alt="Vongola Crest" className="aspect-square w-full rounded-2xl object-cover shadow-md border border-zinc-200" />
            <img src="https://static.wikia.nocookie.net/reborn/images/6/67/Sky_Ring_Battle.PNG/revision/latest?cb=20120422065712" alt="Vongola Conflict" className="aspect-square w-full rounded-2xl object-cover shadow-md mt-0 sm:mt-8 border border-zinc-200" />
            <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg1BnQ47_WWzhe0AjjKudUmd0euKZADLh99z5dYAKvgJ4oWSWP91KmQCo2XOxe3QyKbxihJ3eVGwNN5zwG90vfPEtKuadtp19fgw4ykgfx5AsYbg_cElxRAibW4NdWap6hs1_ZjYN5P4pE/s1600/Vongola+guardian.jpg" alt="Vongola Characters" className="aspect-square w-full rounded-2xl object-cover shadow-md border border-zinc-200" />
            <img src="https://e1.pxfuel.com/desktop-wallpaper/115/765/desktop-wallpaper-vongola-famiglia-katekyo-hitman-reborn-backgrounds-vongola-family.jpg" alt="Mafia aesthetic" className="aspect-square w-full rounded-2xl object-cover shadow-md mt-0 sm:mt-8 border border-zinc-200" />
          </div>
          
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
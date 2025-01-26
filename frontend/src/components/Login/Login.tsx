export function Login() {
  return (
    <section className="flex items-center justify-center w-full h-full">
        <div className="flex flex-col md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-white
         dark:bg-zinc-800 rounded-2xl shadow-xl border-0 dark:border dark:border-stone-700">
        <div className="flex flex-row gap-3 pb-4">
 
         <h1 className="text-3xl font-bold text-zinc-800  dark:text-white my-auto">CV GENERATOR</h1>
    </div>
    <div className="text-sm text-zinc-800 dark:text-white pb-8 ">Ingresa para crear hoja de vida interesante</div>
      <a
        href="/api/login"
        className="w-full text-stone-950 bg-amber-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6">
        Entrar
      </a>
    </div>
    </section>
  );
}

export function Login() {
  return (
    <section className="flex items-center justify-center w-full h-full">
        <div className="flex flex-col md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-base-100 dark:bg-base-300
         rounded-2xl shadow-xl border-0 ">
        <div className="flex flex-row gap-3 pb-4">
 
         <h1 className="text-3xl font-bold text-primary-content my-auto">CV GENERATOR</h1>
    </div>
    <div className="text-sm text-primary-contente pb-8 ">Ingresa para crear hoja de vida interesante</div>
      <a
        href="/api/login"
        className="btn btn-secondary">
        Entrar
      </a>
    </div>
    </section>
  );
}

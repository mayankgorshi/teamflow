import Button from "../common/Button";

function Hero() {
  return (
    <section className="relative overflow-hidden py-32 from-slate-50 via-white to-white">
      <div className="mx-auto max-w-4xl text-center">

        <p className="mb-4 text-1xl font-semibold uppercase tracking-widest text-blue-600">
          Team Collaboration Made Simple
        </p>

        <h1 className="text-5xl font-extrabold leading-tight">
          Manage Your Team Efficiently
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
          Plan projects, assign tasks, track progress and collaborate
          with your team from one powerful workspace.
        </p>

        <div className="mt-12 flex justify-center gap-4">
          <Button text="Get Started" 
                  variant="primary"                 />
          <Button text="Watch Demo" 
                  variant="secondary"/>
        </div>
      </div>
      <div className="mt-12 flex items-center justify-center gap-2 text-gray-500">
        <span>⭐</span>
        <p>Trusted by 10,000+ teams worldwide</p>
      </div>
      <div className="mt-20 mx-auto max-w-5xl rounded-2xl border bg-white p-6 shadow-2xl hover:shadow-2xl">
        <div className="mb-6 flex gap-2">
          <div className="h-3 w-3 rounded-full bg-red-400"></div>
          <div className="h-3 w-3 rounded-full bg-green-400"></div>
          <div className="h-3 w-3 rounded-full bg-blue-400"></div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-xl bg-gray-200 p-6">
            <h3 className="font-semibold">Project</h3>
            <p className="mt-6 text-3xl font-bold">30</p>
          </div>
          <div className="rounded-xl bg-gray-200 p-6">
            <h3 className="font-semibold">Tasks</h3>
            <p className="mt-6 text-3xl font-bold">120</p>
          </div>
          <div className="rounded-xl bg-gray-200 p-6">
            <h3 className="font-semibold">Teams</h3>
            <p className="mt-6 text-3xl font-bold">10</p>
          </div>
        </div>
        <div className="mt-6 h-56 rounded-xl bg-gray-200"></div>
      </div>
    </section>
  );
}

export default Hero;
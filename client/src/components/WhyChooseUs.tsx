function WhyChooseUs() {
  const stats = [
    {
      number: "10K+",
      title: "Active Users",
      description: "Teams collaborating every day."
    },
    {
      number: "99.9%",
      title: "Uptime",
      description: "Reliable performance you can trust."
    },
    {
      number: "500K+",
      title: "Tasks Completed",
      description: "Projects delivered successfully."
    },
    {
      number: "24/7",
      title: "Support",
      description: "Always here when you need us."
    }
  ];

  return (
    <section className="bg-white py-28">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-800">
            WHY TEAMFLOW?
          </p>

          <h2 className="text-5xl font-extrabold tracking-tight">
            Why Teams Choose TeamFlow
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Everything your team needs to plan projects,
            collaborate effectively and deliver faster.
          </p>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {stats.map((item) => (
            <div
              key={item.title}
              className="
                rounded-3xl
                border
                border-gray-200
                bg-slate-50
                p-8
                text-center
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-xl
              "
            >
              <h3 className="text-5xl font-bold text-blue-600">
                {item.number}
              </h3>

              <h4 className="mt-6 text-xl font-semibold">
                {item.title}
              </h4>

              <p className="mt-3 text-gray-600 leading-7">
                {item.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default WhyChooseUs;
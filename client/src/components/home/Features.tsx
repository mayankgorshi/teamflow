function Features() {
  const features = [
    {
      icon: "📋",
      title: "Task Management",
      description: "Organize, prioritize and track every task from one place."
    },
    {
      icon: "👥",
      title: "Team Collaboration",
      description: "Work together in real-time with comments and shared workspaces."
    },

    {
      icon: "📊",
      title: "Analytics Dashboard",
      description: "Monitor productivity with powerful insights and reports."
    },
    {
      icon: "🔒",
      title: "Secure Workplace",
      description: "Enterprise-grade security keeps your projects protected."
    },
  ];
  return (
    <section className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold">
            Everything your team needs</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Enterprise-grade security keeps your projects protected.</p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className=" group rounded-3xl border border-gray-300 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-b-blue-500 hover:shadow-2xl"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-4xl transition group-hover:bg-blue-600 group-hover:text-white">
                {feature.icon}
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-4 leading-7 text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Features;
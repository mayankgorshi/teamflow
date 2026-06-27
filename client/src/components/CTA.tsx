import Button from "./common/Button";

function CTA() {
  return (
    <section className="rounded-xl bg-black py-24 text-center text-white">

      <h2 className="text-5xl font-bold text-gray-100">
        Ready to boost your team's productivity?
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
        Join thousands of teams already using TeamFlow.
      </p>

      <div className="mt-10 text-black">
        <Button
          text="Start Free Today"
          variant="secondary"
        />
      </div>

    </section>
  );
}

export default CTA;
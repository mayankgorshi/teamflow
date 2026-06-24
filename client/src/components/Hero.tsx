import Button from "./Button";

function Hero() {
  return (
    <section>
      <h1>Manage Your Team Efficiently</h1>

      <p>
        Track tasks, manage projects and collaborate
        with your team in one place.
      </p>

      <Button
        text="Get Started"
        color="blue"
        size="big" />
      <Button
        text="Watch Demo"
        color="green"
        size="small" />
    </section>
  );
}

export default Hero;
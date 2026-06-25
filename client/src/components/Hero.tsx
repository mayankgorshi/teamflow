import Button from "./Button";
import { useState } from "react"

function Hero() {
  const [projectcount, setprojectcount] = useState(0);
  function increasecount() { 
  setprojectcount(projectcount + 1)
  } return (
    <section>
      <h1>Manage Your Team Efficiently</h1>

      <p>
        Track tasks, manage projects and collaborate
        with your team in one place.
      </p>
      <h2>{projectcount}</h2>

      <Button
        text="Create project"
        onClick={increasecount}
      />


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
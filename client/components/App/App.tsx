import Race from "../Race/Race.jsx";
import { useRunner } from "../../shared/hooks.js";

const { default: workbenches } = await import(
  "../../../core/test/workbenches.js"
);

const App = () => {
  const runner = useRunner("ws://localhost:3000");
  console.log("runner", runner.value);

  return (
    <main>
      {runner.value && <Race workbenches={workbenches} runner={runner.value} />}
    </main>
  );
};

export default App;

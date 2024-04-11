import { h, Fragment } from "preact";
import c from "./WorkbenchForm.module.css";
import { useRef } from "preact/hooks";
import { iterations } from "../../signals";
import Subjects from "../Subjects/Subjects.jsx";

const WorkbenchForm = ({
  isRunning,
  selectedWorkbench,
  workbenches,
  onStart,
  onStop,
  onWorkbenchChange,
}) => {
  const { name: workbenchName, subjects } = selectedWorkbench || { name: "" };
  const shouldShowWorkbenchTable = Boolean(selectedWorkbench);
  const formRef = useRef(null);

  const handleIterationsChanged = (event) => {
    const numIterations = Number(event.target.value);
    iterations.value = numIterations;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!event.target.querySelector("[data-invalid]")) {
      onStart();
    }
  };

  const handleWorkbenchChange = (event) => {
    onWorkbenchChange(event.target.value);
  };

  return (
    <div class={c.root}>
      <form ref={formRef} class={c.form} onsubmit={handleSubmit}>
        <sl-select
          size="small"
          onsl-change={handleWorkbenchChange}
          placeholder="Select a workbench"
          value={workbenchName.replaceAll(" ", "")}
          name="workbench"
          disabled={isRunning}
          clearable
        >
          {workbenches.map(({ name }) => (
            <sl-option value={name.replaceAll(" ", "")}>{name}</sl-option>
          ))}
        </sl-select>
        {shouldShowWorkbenchTable && (
          <div class={c.fieldset}>
            <Subjects class={c.subjects} subjects={subjects} />
            <sl-input
              label="Iterations"
              size="small"
              type="number"
              value={iterations}
              noSpinButtons
              required
              min={10}
              helpText="Must be 10 or greater."
              onInput={handleIterationsChanged}
            />
            <div class={c["button-container"]}>
              <sl-button
                class={c["full-width"]}
                variant="danger"
                size="small"
                onclick={onStop}
                disabled={!isRunning}
              >
                Stop
              </sl-button>
              <sl-button
                class={c["full-width"]}
                variant="success"
                size="small"
                type="submit"
                loading={isRunning}
                disabled={isRunning}
              >
                Start
              </sl-button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default WorkbenchForm;

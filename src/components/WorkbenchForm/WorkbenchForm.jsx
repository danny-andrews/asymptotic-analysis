import { serialize } from "@shoelace-style/shoelace/dist/utilities/form.js";
import c from "./WorkbenchForm.module.css";
import Subjects from "../Subjects/Subjects.tsx";

const WorkbenchForm = ({
  isRunning,
  selectedWorkbench,
  analysisTarget,
  onAnalysisTargetChange,
  onStart,
  onStop,
}) => {
  const handleAnalysisTargetChanged = (event) => {
    onAnalysisTargetChange(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!event.target.querySelector("[data-invalid]")) {
      onStart(serialize(event.target));
    }
  };

  return (
    <form class={c.form} onSubmit={handleSubmit}>
      <sl-radio-group
        label="Analysis Target(s)"
        name="analysis-target"
        size="small"
        value={analysisTarget}
        onsl-change={handleAnalysisTargetChanged}
      >
        <sl-radio-button disabled={isRunning} value="time">
          Time
        </sl-radio-button>
        <sl-radio-button disabled={isRunning} value="space">
          Space
        </sl-radio-button>
        <sl-radio-button disabled={isRunning} value="time-and-space">
          Time + Space
        </sl-radio-button>
      </sl-radio-group>
      <Subjects subjects={selectedWorkbench.subjects} />
      {isRunning ? (
        <sl-button
          class={c.fullWidth}
          variant="danger"
          size="small"
          onclick={onStop}
        >
          Stop
        </sl-button>
      ) : (
        <sl-button
          class={c.fullWidth}
          variant="success"
          size="small"
          type="submit"
        >
          Start
        </sl-button>
      )}
    </form>
  );
};

export default WorkbenchForm;

import LapStopWatch from "../LapStopWatch";

export default function RunningExercise({ exercise, setMenuScreen }) {
  let { name } = exercise;
  return (
    <div>
      <p>{name}</p>
      <LapStopWatch />
      <button onClick={setMenuScreen}>Back to Menu</button>
    </div>
  );
}

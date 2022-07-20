import { useState, useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

export default function Home() {
  const [workouts, setWorkouts] = useState(null);

  useEffect(() => {
    async function fetchWorkouts() {
      const RESPONSE = await fetch("/api/workouts");
      const JSON = await RESPONSE.json();

      if (RESPONSE.ok) {
        setWorkouts(JSON);
      }
    }

    fetchWorkouts();
  }, []);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
}

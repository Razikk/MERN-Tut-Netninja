import useAuthContext from "./useAuthContext";
import useWorkoutContext from "./useWorkoutContext";

export default function useLogout() {
  const { dispatch } = useAuthContext();
  const { dispatch: workoutsDispatch } = useWorkoutContext();

  function logout() {
    // remove user from storage
    localStorage.removeItem("user");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
    workoutsDispatch({ type: "SET_WORKOUTS", payload: null });
  }

  return { logout };
}

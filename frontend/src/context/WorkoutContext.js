import { createContext, useReducer } from "react";

const WorkoutsContext = createContext();

function workoutsReducer(state, action) {
  switch (action.type) {
    case "SET_WORKOUTS":
      return { workouts: action.payload };
    case "CREATE_WORKOUT":
      return { workouts: [action.payload, ...state.workouts] };
    default:
      return state;
  }
}

function WorkoutsContextProvider({ children }) {
  const [state, dispatch] = useReducer(workoutsReducer, { workouts: null });

  return <WorkoutsContext.Provider>{children}</WorkoutsContext.Provider>;
}

export { WorkoutsContext, WorkoutsContextProvider, workoutsReducer };

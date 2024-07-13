import { useEffect, useMemo, useReducer } from "react";
import { Form } from "./components/Form";
import { activityReducer, initialState } from "./reducers/activityReducer";
import { ActivityList } from "./components/ActivityList";
import { CalorieTracker } from "./components/CalorieTracker";

function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(state.activities));
  }, [state.activities]);

  const resetActivities = () => useMemo(() => state.activities.length , [state.activities])
  return (
    <>
      <header className="bg-lime-300 py-3">
        <div className="max-w-4xl mx-auto flex justify-between">
          <h1 className="text-center text-3xl font-bold uppercase">
            Calorie Tracker
          </h1>
        <button className="bg-gray-600 px-3 py-1 rounded-lg shadow border-none text-white font-semibold disabled:opacity-10"  
        disabled={!resetActivities()} 
        onClick={()=>dispatch({type: 'restart-activities'})}>
          Reset App
        </button>
        </div>
      </header>
      <section className="bg-lime-200 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form dispatch={dispatch} state={state} />
        </div>
      </section>
    <section className="bg-gray-800 py-10">
      <div className="max-w-4xl mx-auto">
        <CalorieTracker
        activities= {state.activities}
        />
      </div>
    </section>
      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList activities={state.activities} dispatch={dispatch} />
      </section>
    </>
  );
}

export default App;

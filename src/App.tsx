import { useReducer } from "react"
import { Form } from "./components/Form"
import { activityReducer, initialState } from "./reducers/activityReducer"
import { ActivityList } from "./components/ActivityList"

function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState)

  return (
    <>
      <header className="bg-lime-300 py-3">
        <div className="max-w-4xl mx-auto flex justify-between">
          <h1 className="text-center text-lg font-bold uppercase">
            Calorie Tracker
          </h1>

        </div>
      </header>
      <section className="bg-lime-200 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form
            dispatch = {dispatch}
          />
        </div>
      </section>
      <section className="p-10 mx-auto max-w-4xl"> 
        <ActivityList
          activities = {state.activities}
        />
      </section>
    </>
  )
}

export default App
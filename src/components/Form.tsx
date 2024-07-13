import { categories } from "../data/categories";
import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react";
import { v4 as uuidv4} from "uuid";
import { Activity } from "../types";
import { ActivityActions, ActivityState } from "../reducers/activityReducer";

type FormProps = {
  dispatch: Dispatch<ActivityActions>,
  state: ActivityState
};

const initialState: Activity = {
  id: uuidv4(),
  category: 1,
  activity: "",
  calories: 0,
}

export const Form = ({ dispatch, state }: FormProps) => {

  const [form, setForm] = useState<Activity>(initialState);

  useEffect(() => {
    if(state.activeId){
      const selecActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId )[0]
      setForm(selecActivity)
    }
  },[state.activeId])

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    const isNumberField = ["category", "calories"].includes(e.target.id);

    setForm({
      ...form,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value,
    });
  };

  const isValidActivity = () => {
    const { activity, calories } = form;
    return activity.trim() !== "" && calories > 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({type: "save-activity",payload: {newActivity: form,}})
    setForm({
      ...initialState,
      id: uuidv4(),
    })
  };
  return (
    <form
      className="space-y-5 bg-orange-400 bg-opacity-80 shadow p-10 rounded-lg "
      onSubmit={handleSubmit}
    >
      <p className="font-semibold text-lg text-white">
        Fill in all the fields of the form
      </p>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="text-white font-semibold">
          Category:
        </label>
        <select
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          id="category"
          value={form.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="activity" className="text-white font-semibold">
          Activity or Food:
        </label>
        <input
          type="text"
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          id="activity"
          placeholder="Example. Salad, Orange Juice, Bicycle, Taekwondo"
          value={form.activity}
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="text-white font-semibold">
          Calories:
        </label>
        <input
          type="number"
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          id="calories"
          placeholder="Example. 200, 500, 1000"
          value={form.calories}
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        className="bg-gray-50 hover:bg-gray-200 
        w-full p-2 font-semibold uppercase cursor-pointer transition-colors rounded-lg shadow disabled:opacity-50"
        value={form.category === 1 ? "Add Food 🥗" : "Add Activity 🏋️‍♂️"}
        disabled={!isValidActivity()}
      />
    </form>
  );
};

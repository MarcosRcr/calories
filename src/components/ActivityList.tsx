import { Activity } from "../types";
import { categories } from "../data/categories";
import { Dispatch, useMemo } from "react";
import { HiPencilSquare, HiMiniTrash } from "react-icons/hi2";
import { ActivityActions } from "../reducers/activityReducer";

type ActivityListProps = {
  activities: Activity[];
  dispatch: Dispatch<ActivityActions>;
};

export const ActivityList = ({ activities, dispatch }: ActivityListProps) => {
  const categoryName = useMemo(
    () => (category: Activity["category"]) =>
      categories.map((cat) => (cat.id === category ? cat.name : "")),
    [activities]
  );
  const isEmpty = useMemo(()=> activities.length === 0, [activities])
  return (
    <>
      <h2 className="text-4xl font-bold text-slate-700 text-center">
        Food and Training
      </h2>
      {isEmpty && (
        <p className="text-2xl text-center text-slate-700 my-5">
          No activities yet
        </p>
      )}
      
      {activities.map((activity) => (
        <div
          className="px-5 py-10 bg-white mt-5 flex justify-between shadow"
          key={activity.id}
        >
          <div className="space-y-2 relative">
            <p
              className={`absolute -top-8 -left-8 px-10 py-2 
                        text-white uppercase font-bold 
                        ${
                          activity.category === 1
                            ? "bg-lime-400"
                            : "bg-orange-500"
                        }`}
            >
              {categoryName(+activity.category)}
            </p>
            <p className="text-2xl font-bold pt-5">{activity.activity}</p>
            <p className="font-black text-4xl text-lime-400">
              {activity.calories} {""} <span>Calories</span>
            </p>
          </div>
          <div className="flex gap-5">
            <button
              onClick={() =>
                dispatch({ type: "set-activeId", payload: { id: activity.id } })
              }
              className="flex gap-5 items-center "
            >
              <HiPencilSquare className="size-8 text-orange-500" />
            </button>
            <button
              onClick={() =>
                dispatch({ type: "delete-activity", payload: { id: activity.id } })
              }
              className="flex gap-5 items-center "
            >
              <HiMiniTrash className="size-8 text-red-500" />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

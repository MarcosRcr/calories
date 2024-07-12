import { Activity } from "../types";
import { categories } from "../data/categories";
import { useMemo } from "react";
import { HiPencilSquare } from "react-icons/hi2";

type ActivityListProps = {
  activities: Activity[];
};

export const ActivityList = ({ activities }: ActivityListProps) => {
  const categoryName = useMemo(
    () => (category: Activity["category"]) =>
      categories.map((cat) => (cat.id === category ? cat.name : "")),
    [activities]
  );
  return (
    <>
      <h2 className="text-4xl font-bold text-slate-700 text-center">
        Food and Training
      </h2>
      {activities.map((activity) => (
        <div
          className="px-5 py-10 bg-white mt-5 flex justify-between"
          key={activity.id}
        >
          <div className="space-y-2 relative">
            <p className={`absolute -top-8 -left-8 px-10 py-2 
                        text-white uppercase font-bold 
                        ${activity.category === 1 ? 'bg-lime-400' : 'bg-orange-500'}`}>
            {categoryName(+activity.category)}
            </p>
            <p className="text-2xl font-bold pt-5">{activity.activity}</p>
            <p className="font-black text-4xl text-lime-400">
              {activity.calories} {""} <span>Calories</span>
            </p>
          </div>
          <div>
            <button className="flex gap-5 items-center ">
              <HiPencilSquare 
              className="size-8 text-gray-900"
              />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

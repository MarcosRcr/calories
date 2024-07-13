import { useMemo } from "react";
import { Activity } from "../types";
import { Quantities } from "./Quantities";

type CalorieTrackerProps = {
  activities: Activity[];
};
export const CalorieTracker = ({ activities }: CalorieTrackerProps) => {
  //counters
  const caloriesConsumed = useMemo(() => {
    return activities.reduce(
      (total, activity) =>
        activity.category === 1 ? total + activity.calories : total,
      0
    );
  }, [activities]);
  const caloriesBurned = useMemo(() => {
    return activities.reduce(
      (total, activity) =>
        activity.category === 2 ? total + activity.calories : total,
      0
    );
  }, [activities]);

   const caloricBalance = useMemo(()=> caloriesConsumed - caloriesBurned,[activities])
  return (
    <>
      <h2 className="text-4xl text-slate-300 text-center font-black">
        Your graph
      </h2>

      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <Quantities calories={caloriesConsumed} text="Consumed"/>
        <Quantities calories={caloriesBurned} text="Burned"/>
        <Quantities calories={caloricBalance} text="Balance"/>
      </div>
    </>
  );
};

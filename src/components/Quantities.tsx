type QuantitiesProps = {
   calories: number,
   text: string
}
export const Quantities = ({calories, text}: QuantitiesProps) => {
  return (
   <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
   <span className="flex-col font-black text-5xl text-orange-200">
     {calories}
   </span>
   {text}
 </p>
  )
}

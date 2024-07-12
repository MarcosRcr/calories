import { Activity } from "../types"

export type ActivityActions = 
   { type: 'save-activity', payload: {newActivity : Activity} }

type ActivityState = {
   activities : Activity[];
}

export const initialState : ActivityState ={
   activities: []
}

export const activityReducer = (
   state:ActivityState = initialState,
   action:ActivityActions 
) => {
   if(action.type === 'save-activity'){
      // this code manages the logic for updating the state
      return {
         ...state,
         activities: [...state.activities, action.payload.newActivity]
      }
   }
   return state
}
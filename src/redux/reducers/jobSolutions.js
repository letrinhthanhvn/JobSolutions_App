import * as types from '../types';

const initialState = {
   userName: undefined
}

export default function jobSolutions(state = initialState, action) {
   switch (action.type) {
      case types.LOGIN: {
         return state
      }

      case types.LOGIN_SUCCESS: {
         console.log('userName', action.payload)
         let userName = action.payload.userName;
         return {
            ...state, userName
         }
      }

      default:
      return state
   }
} 
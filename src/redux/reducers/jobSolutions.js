import * as types from '../types';
import _ from 'lodash';

const initialState = {
   user: {
      username: '',
      password: '',
      candidate_id: null
   },
   isLogin: false,
   savedJobs: {
      // 'username': [1, 2, 3, 4]
   }
}

export default function jobSolutions(state = initialState, action) {
   switch (action.type) {
      case types.LOGIN: {
         return {
            ...state,
            isLogin: true
         };
      }

      case types.LOGIN_SUCCESS: {
         console.log('userName', action.payload)
         let user = {
            username: action.payload.username,
            password: action.payload.password,
            candidate_id: action.payload.candidate_id
         }
         return {
            ...state,
            user,
            isLogin: false
         }
      }

      case types.LOGIN_FAILED: {
         return {
            ...state,
            isLogin: false
         };
      }

      case types.SAVEDJOBS: {
         const { username, recruitment_id } = action.payload

         console.log('username, recruitment_id', username, recruitment_id)

         let savedJobs = { ...state.savedJobs }
         if (!savedJobs[username]) {
            console.log('savedJobs chua ton tai', savedJobs[username])
            savedJobs[username] = [recruitment_id]
            console.log('savedJobs[username]', savedJobs[username])
         } else {
            console.log('add saved jobs')
            if (_.includes(savedJobs[username], recruitment_id)) {
               savedJobs[username] = savedJobs[username].filter(recruitment_id => recruitment_id != recruitment_id)
            } else {
               savedJobs[username] = savedJobs[username].concat([recruitment_id])
            }
         }

         return {
            ...state,
            savedJobs
         }
      }

      default:
         return state
   }
} 
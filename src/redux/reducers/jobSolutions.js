import * as types from '../types';
import _ from 'lodash';

const initialState = {
   user: {
      username: '',
      password: '',
      candidate_id: null,
   },
   isLogin: false,
   savedJobs: {
      // 'username': [
      //    { recruitment_id: 1, jobname: '', location: '', industry_id: '' },
      //    { recruitment_id: 2, jobname: '', location: '', industry_id: '' },
      //    { recruitment_id: 3, jobname: '', location: '', industry_id: '' },
      // ]
   },
   isRegister: false,
   savedCompany: {

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
         // this.props.savedjobs(username, { recuitment_id: 1, jobName: '', location: '', industry_id: 1, deadline:})
         const { username, job } = action.payload

         // console.log('username, recruitment_id', username, recruitment_id)

         let savedJobs = { ...state.savedJobs }
         if (!savedJobs[username]) {
            savedJobs[username] = [job]
         } else {
            if (savedJobs[username].find(e => e.recruitment_id == job.recruitment_id)) {
               console.log('delete favorite')
               savedJobs[username] = savedJobs[username].filter(e => e.recruitment_id != job.recruitment_id)
               console.log('mang saved job', savedJobs[username].filter(job => job.recruitment_id != job.recruitment_id))
            } else {
               savedJobs[username] = savedJobs[username].concat([job])
            }
         }

         return {
            ...state,
            savedJobs
         }
      }

      case types.SAVEDCOMPANY: {
         const { username, company } = action.payload

         let savedCompany = { ...state.savedCompany }
         if (!savedCompany[username]) {
            savedCompany[username] = [company]
         } else {
            if (savedCompany[username].find(e => e.company_id == company.company_id)) {
               savedCompany[username] = savedCompany[username].filter(e => e.company_id != company.company_id)
            } else {
               savedCompany[username] = savedCompany[username].concat([company])
            }
         }

         return {
            ...state,
            savedCompany
         }
      }

      default:
         return state
   }
} 
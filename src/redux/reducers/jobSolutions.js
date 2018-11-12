import * as types from '../types';
import _ from 'lodash';
import { AsyncStorage } from 'react-native';

const initialState = {
   user: {
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

   },
   userIntro: {
      // 2: {
      //    name: "thanh letrinh", minSalary: '', maxSalary: '', email: "", phone: '', degree: '', address: ""
      // }
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
         console.log('LOGIN_SUCCESS', action.payload.candidate_id)
         let user = {
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
         const { candidate_id, job } = action.payload

         let savedJobs = { ...state.savedJobs }
         if (!savedJobs[candidate_id]) {
            savedJobs[candidate_id] = [job]
         } else {
            if (savedJobs[candidate_id].find(e => e.recruitment_id == job.recruitment_id)) {
               console.log('delete favorite')
               savedJobs[candidate_id] = savedJobs[candidate_id].filter(e => e.recruitment_id != job.recruitment_id)
               console.log('mang saved job', savedJobs[candidate_id].filter(job => job.recruitment_id != job.recruitment_id))
            } else {
               savedJobs[candidate_id] = savedJobs[candidate_id].concat([job])
            }
         }

         return {
            ...state,
            savedJobs
         }
      }

      case types.SAVEDCOMPANY: {
         const { candidate_id, company } = action.payload

         let savedCompany = { ...state.savedCompany }
         if (!savedCompany[String(candidate_id)]) {
            savedCompany[String(candidate_id)] = [company]
         } else {
            if (savedCompany[String(candidate_id)].find(e => e.company_id == company.company_id)) {
               savedCompany[String(candidate_id)] = savedCompany[String(candidate_id)].filter(e => e.company_id != company.company_id)
            } else {
               savedCompany[String(candidate_id)] = savedCompany[String(candidate_id)].concat([company])
            }
         }

         return {
            ...state,
            savedCompany
         }
      }

      case types.SAVEDUSERINTRO: {
         console.log('reduce saved user intro', action.payload)
         const { candidate_id } = action.payload
         // name, minSalary, maxSalary, email, phone, degree, address

         let userIntro = {...state.userIntro}

         if (!userIntro[candidate_id]) {
            userIntro[candidate_id] = action.payload
         } else {
            userIntro[candidate_id] = action.payload
         }

         return {
            ...state,
            userIntro
         }
      }

      // case types.GETCANDIDATEID_SUCCESS: {
      //    let localCandidateId = AsyncStorage.getItem('candidate_id')
      //    let user = {...state.user}
      //    if (localCandidateId) {
      //       user.candidate_id = action.payload
      //    } else {

      //    }
      //    return {
      //       ...state,
      //       user
      //    }
      // }

      default:
         return state
   }
} 
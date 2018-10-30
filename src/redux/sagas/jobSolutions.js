import { takeLatest, put, select, call } from 'redux-saga/effects';
import * as types from '../types';
import {
   loginSuccess,
   loginFailed,
   fetchIndustrySuccess,
   fetchIndustryFailed,
   registerSuccess,
   registerFailed
} from '../actions/jobSolutions'

/**
* 
*/
function* sagaLogin(action) {
   try {
      let res = yield fetch('http://localhost:3000/users/signin_candidate', {
         method: 'POST',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            user_name: action.payload.username,
            password: action.payload.password,
            role: 1,
         })
      }).then((res) => res.json())
      if (res.status == "SUCCESS") {
         console.log('sagaLogin', res)
         yield put(loginSuccess({username: action.payload.username, password: action.payload.password, candidate_id: res.candidate.candidate_id}))
      } else {
         yield put(loginFailed())
      } 
   } catch (e) {
      console.log('Catche Login', e)
      yield put(loginFailed())
   }
}

export function* watchLogin() {
   yield takeLatest(types.LOGIN, sagaLogin)
}

// fetch api get list industry

// function* sagaListIndustry(action) {
//    try {
//       let res = fetch('http://localhost:3000/industry/get_industry_list').then((res) => res.json())
//       console.log('resSage', res)
//       if (res) {
//          yield put(fetchIndustrySuccess(res))
//       } else {
//          yield put(fetchIndustryFailed())
//       }
//    } catch (e) {
//       console.log('Catch fetch industry failed', e)
//       yield put(fetchIndustryFailed())
//    }
// }

// export function* watchFetchListIndustry() {
//    yield takeLatest(types.FETCHLISTINDUSTRY, sagaListIndustry)
// }

// saved jobs

/**
* 
*/
// function* sagaSavedJobs() {
//    try {
//       let 
//    } catch(e) {
//     console.log('Catche SavedJobs', e)
//    }
// }

// export function* watchSavedJobs() {
//    yield takeLatest(types.SAVEDJOBS, sagaSavedJobs)
// }

/**
* 
*/
function* sagaRegister(action) {
   try {
      let res = yield fetch('http://localhost:3000/users/register_candidate',  {
         method: 'POST',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            user_name: action.payload.username,
            password: action.payload.password,
            first_name: "thanh",
            last_name: "le"
         })
      }).then((res) => res.json())
      if (res.status == "SUCCESS") {
         yield put(registerSuccess(action.payload))
      } else {
         yield put(registerFailed())
      }
      console.log('resRegister', res)
   } catch(e) {
    console.log('Catche Register', e)
   }
}

export function* watchRegister() {
   yield takeLatest(types.REGISTER, sagaRegister)
}



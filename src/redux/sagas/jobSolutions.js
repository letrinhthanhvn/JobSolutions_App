import { takeLatest, put, select, call } from 'redux-saga/effects';
import * as types from '../types';
import {
   loginSuccess,
   loginFailed,
   fetchIndustrySuccess,
   fetchIndustryFailed,
   registerSuccess,
   registerFailed,
   getCandidateIdLocalSuccess,
   getCandidateIdLocalFailed,
   savedUserIntroSuccess,
   savedUserIntroFailed,
   sendRatingSuccess,
   sendRatingFailed
} from '../actions/jobSolutions';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';

/**
* 
*/
function* sagaLogin(action) {
   console.log('sagaLogin', action)
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
         yield put(loginSuccess({ candidate_id: res.candidate.candidate_id }))
         yield AsyncStorage.setItem('candidate_id', JSON.stringify(res.candidate.candidate_id))
         yield Actions.listField()
      } else {
         yield put(loginFailed())
         yield alert('Đăng nhập thất bại! Bạn vui lòng thử lại!')
         console.log('Login failed::::::::')
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
      let res = yield fetch('http://localhost:3000/users/register_candidate', {
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
   } catch (e) {
      console.log('Catche Register', e)
   }
}

export function* watchRegister() {
   yield takeLatest(types.REGISTER, sagaRegister)
}

/**
* 
*/
function* sagaSavedUserIntro(action) {
   console.log("payload saved User intro", action.payload)
   try {
      let res = yield fetch('http://localhost:3000/users/update_can_info', {
         method: 'POST',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            candidate: {
               candidate_id: action.payload.candidate_id,
               phone: action.payload.phone
            },
            career_info: {
               industry_id_fk: 1,
               career_goal: action.payload.career_goal
            }
         })
      }).then((res) => res.json())
      if (res.status == "SUCCESS") {
         console.log('res', res)
         yield put(savedUserIntroSuccess(action.payload))
      } else {
         console.log("failed user introduce!")
         yield put(savedUserIntroFailed)
      }
   } catch (e) {
      console.log('Catche SavedUserInfor', e)
   }
}

export function* watchSavedUserInfor() {
   yield takeLatest(types.SAVEDUSERINTRO, sagaSavedUserIntro)
}

/**
* 
*/
function* sagaSendRating(action) {
   try {
      let res = yield fetch('http://localhost:3000/recruitment/rate', {
         method: 'POST',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            recruitment_id: action.payload.recruitment_id,
            point: action.payload.point
         })
      }).then((res) => res.json())
      if (res.status == "SUCCESS") {
         yield put(sendRatingSuccess({recruitment_id: action.payload.recruitment_id,
            point: action.payload.point}))
      } else {
         yield put(sendRatingFailed())
      }
   } catch (e) {
      console.log('Catche SendRating', e)
      yield put(sendRatingFailed())
   }
}

export function* watchSendRating() {
   yield takeLatest(types.SENDRATING, sagaSendRating)
}



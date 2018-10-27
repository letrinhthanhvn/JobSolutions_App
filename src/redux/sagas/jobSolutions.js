import { takeLatest, put, select, call } from 'redux-saga/effects';
import * as types from '../types';
import {
   loginSuccess,
   loginFailed,
   fetchIndustrySuccess,
   fetchIndustryFailed
} from '../actions/jobSolutions'

/**
* 
*/
function* sagaLogin(action) {
   try {
      // let res = fetch('', {
      //    method: 'POST',
      //    headers: {
      //       'Accept': 'application/json',
      //       'Content-Type': 'application/json'
      //    },
      //    body: JSON.stringify({
      //       username: '',
      //       password: ''
      //    })
      // })
      // if (res.status == "SUCCESS") {
      //    yield put(loginSuccess(action.payload))
      // } else {
      //    yield put(loginFailed())
      // } 
      yield put(loginSuccess(action.payload))
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


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

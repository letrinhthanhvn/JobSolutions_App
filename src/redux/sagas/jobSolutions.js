import { takeLatest, put, select, call } from 'redux-saga/effects';
import * as types from '../types';
import {
   loginSuccess,
   loginFailed
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

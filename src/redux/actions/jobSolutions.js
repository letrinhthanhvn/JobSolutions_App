import * as types from '../types';

export const login = (data) => {
   return {
      type: types.LOGIN,
      payload: data
   }
}

export const loginSuccess = (data) => {
   return {
      type: types.LOGIN_SUCCESS,
      payload: data
   }
}

export const loginFailed = () => {
   return {
      type: types.LOGIN_FAILED
   }
}

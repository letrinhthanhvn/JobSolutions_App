import * as types from '../types';

// login
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

// saved job
export const savedJob = (data) => {
   return {
      type: types.SAVEDJOBS,
      payload: data
   }
}

export const savedJobSuccess = (data) => {
   return {
      type: types.SAVEDJOBS_SUCCESS,
      payload: data
   }
}

export const savedJobFailed = () => {
   return {
      type: types.SAVEDJOBS_FAILED
   }
}

// register
export const register = (data) => {
   return {
      type: types.REGISTER,
      payload: data
   }
}

export const registerSuccess = (data) => {
   return {
      type: types.REGISTER_SUCCESS,
      payload: data
   }
}

export const registerFailed = () => {
   return {
      type: types.REGISTER_FAILED
   }
}

// saved company
export const savedCompanyFunc = (data) => {
   return {
      type: types.SAVEDCOMPANY,
      payload: data
   }
}

export const savedCompanySuccess = (data) => {
   return {
      type: types.SAVEDCOMPANY_SUCCESS,
      payload: data
   }
}

export const savedCompanyFailed = () => {
   return {
      type: types.SAVEDCOMPANY_FAILED
   }
}

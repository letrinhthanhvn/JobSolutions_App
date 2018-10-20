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

// fetch list industry
// export const fetchIndustry = (data) => {
//    return {
//       type: types.FETCHLISTINDUSTRY,
//       payload: data
//    }
// }

// export const fetchIndustrySuccess = (data) => {
//    return {
//       type: types.FETCHLISTINDUSTRY_SUCCESS,
//       payload: data
//    }
// }

// export const fetchIndustryFailed = () => {
//    return {
//       type: types.FETCHLISTINDUSTRY_FAILED
//    }
// }


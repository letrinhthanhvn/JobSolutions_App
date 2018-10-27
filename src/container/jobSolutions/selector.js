import { createSelector } from 'reselect';

export const createLoginSelector = createSelector(
   (state, props) => state.user,
   (user) => {
      if (!user) {
         return undefined
      }
      return speaker.user
   }
)


// export const createSavedJobsSelector = createSelector(
//    (state) => state.
// )
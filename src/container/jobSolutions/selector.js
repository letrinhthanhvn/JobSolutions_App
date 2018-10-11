import { createSelector } from 'reselect';

export const createSelectorUserName = createSelector(
   (state, props) => state.userName,
   (userName) => {
      if (!userName) {
         return undefined
      }
      return speaker.userName
   }
)

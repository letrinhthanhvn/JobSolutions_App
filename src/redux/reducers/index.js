import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';


import JobSolutions from './jobSolutions';

const persistConfig = {
   key: 'root',
   storage: storage,
   whitelist: ['savedJobs', 'savedCompany', 'user', 'userIntro']
}

const persistedReducer = persistReducer(persistConfig, JobSolutions)

export default combineReducers({
   jobSolutions: persistedReducer
});
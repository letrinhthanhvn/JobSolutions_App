import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { runSaga } from 'redux-saga';
import { createLogger } from 'redux-logger';
import reducer from './reducers';
import sagas from './sagas';
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import storage from 'redux-persist/lib/storage';
import * as types from './types';

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

var logger = createLogger({
   predicate: (getState, action) => isDebuggingInChrome,//&& action.type !== types.SPEAKER_UPDATE_SPEAKER,
   collapsed: true,
   duration: true
})

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
   reducer,
   undefined,
   compose(
      applyMiddleware(sagaMiddleware, logger)
   )
);

sagaMiddleware.run(sagas);

// export default configureStore = (onCompletion = () => { }) => {
//    persistStore(
//       store,
//       undefined,
//       onCompletion 
//    );

//    sagaMiddleware.run(sagas);

//    return store;
// }

// export const {
//    store
// };

export const persistor = persistStore(store);
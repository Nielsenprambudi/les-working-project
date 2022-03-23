import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import AsycStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage: AsycStorage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  const store = createStore(
    persistedReducer,
    applyMiddleware(promiseMiddleware, logger),
  );
  const persistor = persistStore(store);
  return {store, persistor};
};

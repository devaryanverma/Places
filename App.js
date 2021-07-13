import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import PlacesNavigator from './navigation/PlacesNavigator';
import placesReducer from './store/place-reducer';
import { init, fetchValue} from './helper/db';

init()
  .then(() => {
    console.log('Database Initialized');
  })
  .catch(err => {
    console.log('Database not initialized');
    console.log(err);
  });

  

const rootReducer = combineReducers({
  places: placesReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}

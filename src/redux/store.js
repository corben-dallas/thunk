import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import filterReducer from './reducers/filterReducer';
import editReducer from './reducers/reducer';
import thunkReducer from './reducers/thunkReducer';

const reducer = combineReducers({
	editReducer,
	filterReducer,
	thunkReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;

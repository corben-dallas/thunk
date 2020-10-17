import { combineReducers, createStore } from 'redux';
import filterReducer from './reducers/filterReducer';
import editReducer from './reducers/reducer';

const reducer = combineReducers({
	editReducer,
	filterReducer,
})

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;

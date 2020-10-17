import { SEARCH_STRING } from "../actions/actionTypes";

const initialState = {
	searchString: '',
};

const filterReducer = (state = initialState, action) => {
	switch(action.type) {
		case SEARCH_STRING:
			return {
				...state,
				searchString: action.payload,
			};
		default: 
			return state;
	}	
};

export default filterReducer;

const { FETCH_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } = require("../actions/actionTypes");

const initialState = {
	list: [],
	isLoading: false,
	error: '',
}

const thunkReducer = (state = initialState, action) => {
	switch(action.type) {
		case FETCH_REQUEST: 
			return { ...state, isLoading: true, error: '' };
		case FETCH_DATA_SUCCESS: 
			const { items } = action.payload;
			return { ...state, isLoading: false, error: '', list: [...items] };
		case FETCH_DATA_FAILURE:
			const { error } = action.payload;
			return { ...state, isLoading: false, error };

		default: 
			return state;
	}
} 

export default thunkReducer;

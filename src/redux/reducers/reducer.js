import { EDIT_ITEM, ADD_ITEM, DELETE_ITEM } from "../actions/actionTypes";
import { nanoid } from "nanoid";

const initialState = [];

const editReducer = (state = initialState, action) => {
	switch(action.type) {
		case ADD_ITEM:
			const { description, price } = action.payload;
			return [...state, { id: nanoid(), description, price }];
		case EDIT_ITEM: 
			console.log(action.payload);
			const { id, description: newDescription, price: newPrice } = action.payload;
			return [...state.filter(item => item.id !== id), { description: newDescription, price: newPrice, id } ]
		case DELETE_ITEM: 
			const { id: deleteByID } = action.payload;
			return [...state.filter(item => item.id !== deleteByID)];
		default:
			return state;
	}
}

export default editReducer;

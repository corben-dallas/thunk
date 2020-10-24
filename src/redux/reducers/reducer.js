import { EDIT_ITEM, ADD_ITEM, DELETE_ITEM, ADD_SERVER_DATA, REMOVE_ITEMS } from "../actions/actionTypes";
import { nanoid } from "nanoid";

const initialState = [];

const editReducer = (state = initialState, action) => {
	switch(action.type) {
		case ADD_ITEM:
			const { description, price } = action.payload;
			return [...state, { id: nanoid(), description, price }];
		case ADD_SERVER_DATA:
			return [...state, ...action.payload.map(item => ({
				...item,
				description: item.name,
			}))];
		case EDIT_ITEM: 
			console.log(action.payload);
			const { id, description: newDescription, price: newPrice } = action.payload;
			return [...state.filter(item => item.id !== id), { description: newDescription, price: newPrice, id } ]
		case DELETE_ITEM: 
			const { id: deleteByID } = action.payload;
			return [...state.filter(item => item.id !== deleteByID)];
		case REMOVE_ITEMS:
			return [];
		default:
			return state;
	}
}

export default editReducer;
